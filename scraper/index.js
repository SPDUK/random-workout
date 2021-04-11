// scrapes youtube channels to find links for videos

const puppeteer = require('puppeteer');

const url = 'https://www.youtube.com/c/athleanx/search?query=workout';

(async () => {
  const browser = await puppeteer.launch({ headless: false });

  const viewport = { width: 800, height: 800 };

  const page = await browser.newPage();
  await page.setViewport(viewport);

  await page.goto(url, { waitUntil: 'load' });

  // click annoying I agree button to consent to cookies and actually go to real page 🤢
  await page.evaluate(() => {
    document.querySelector('form button').click();
  });

  // page has 5 video titles and some sort of content for one -> page has rendered in DOM
  await page.waitForFunction(() => {
    const vts = document.querySelectorAll('#dismissible #video-title');
    return vts.length > 5 && vts[0].innerText.length > 5;
  });

  // recursively scroll to bottom on repeat until all videos should be loaded
  await page.evaluate(async () => {
    const wait = (amount = 0) => new Promise((resolve) => setTimeout(resolve, amount));

    let lastElement = null;

    // don't want to have infinite loops if the user's channel is way too big - 20 scrolls should be enough for any big channel e.g athleanx with ~1,200 videos
    async function scrollDown(retries = 20) {
      if (retries <= 0) return;

      const videos = document.querySelectorAll('#dismissible');
      const lastVideo = videos[videos.length - 1];
      lastVideo.scrollIntoView();

      console.log({ lastVideo, lastElement });

      if (lastVideo === lastElement) return;
      await wait(3500);

      lastElement = lastVideo;

      // keep scrolling down
      await scrollDown(retries - 1);
    }

    await scrollDown();

    // if we have any unloaded images we missed -> find them and scroll to them so they load in the image
    const unloadedImages = document.querySelectorAll('.yt-img-shadow');
    for await (const img of unloadedImages) {
      img.scrollIntoView();
      await wait(300);
    }
  });

  const textContent = await page.evaluate(() => {
    const data = [];
    const videos = [...document.querySelectorAll('#dismissible')];

    videos.forEach((video) => {
      const src = video.querySelector('#img')?.src;

      const videoTitle = video.querySelector('#video-title');

      const href = videoTitle?.href;
      const title = videoTitle?.innerText;

      data.push({ src, href, title });
    });

    // must return JSON serializable data
    return JSON.stringify(data);
  });

  console.log({ textContent: JSON.parse(textContent) });

  await browser.close();
})();
