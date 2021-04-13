const { Agenda } = require('agenda');
// scrapes youtube channel page to find links for videos
const agenda = new Agenda({ db: { address: process.env.MONGODB_URL } });

const puppeteer = require('puppeteer');
const { allObjectKeysHaveValues } = require('../utils');

const Workout = require('../models/Workout');

const workoutChannels = [
  // already have these for now in db
  // 'https://www.youtube.com/c/athleanx/search?query=workout',
  // 'https://www.youtube.com/c/BullyJuice/search?query=workout',
  // 'https://www.youtube.com/c/TheBodyCoachTV/search?query=workout',
  // 'https://www.youtube.com/c/TIFFxDAN/search?query=workout',
  // 'https://www.youtube.com/c/TheZeusFitness/search?query=workout',
  // 'https://www.youtube.com/c/CarolineGirvan/search?query=workout',
  // 'https://www.youtube.com/c/growingannanas/search?query=workout',
  // 'https://www.youtube.com/c/RachelGulottaFitness/search?query=workout',
  // 'https://www.youtube.com/c/ACHVPEAK/search?query=workout',
  // 'https://www.youtube.com/c/FunkRoberts/search?query=workout',
  // 'https://www.youtube.com/c/PamelaRf1/search?query=workout',
  // not done
  'https://www.youtube.com/c/OFFICIALTHENXSTUDIOS/search?query=workout',
];

async function goToPageAndLoadAllVideoData(page, channel) {
  await page.goto(channel, { waitUntil: 'load' });

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
    const wait = (amount = 0) =>
      new Promise((resolve) => setTimeout(resolve, amount));

    let lastElement = null;

    // don't want to have infinite loops if the user's channel is way too big - 20 scrolls should be enough for any big channel e.g athleanx with ~1,200 videos
    async function scrollDown(retries = 20) {
      if (retries <= 0) return;

      const videos = document.querySelectorAll('#dismissible');
      const lastVideo = videos[videos.length - 1];
      lastVideo.scrollIntoView();

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
}

async function getWorkoutDataFromPage(page) {
  const scrapedData = await page.evaluate(() => {
    const channelName =
      document.querySelector('.ytd-channel-name')?.innerText?.trim() || '';

    const subCount =
      document
        .querySelector('#subscriber-count')
        ?.innerText.split('subscribers')?.[0]
        ?.trim() || '';

    const videos = [...document.querySelectorAll('#dismissible')];

    const data = videos.map((video) => {
      const imageLink = video.querySelector('#img')?.src;

      const videoTitle = video.querySelector('#video-title');
      const description = video.querySelector('#description-text')?.innerText;

      const href = videoTitle?.href;
      const title = videoTitle?.innerText;

      let duration = 0;
      // find any variation of 5min 5 min 5 minutes 5 MINS 1 hour(s) etc
      const durationRegex = /(?<number>\d+(?:\.\d+)?)[\s-]*(?<unit>min(?:ute)?|h(?:ou)?r|sec(?:ond)?)(?<plural>s)?/iu;

      const titleMatch = title.match(durationRegex);

      // if no match -> find the video length and estimate the minutes
      if (!titleMatch) {
        const videoLength = video
          .querySelector('span.ytd-thumbnail-overlay-time-status-renderer')
          .innerText.split(':');

        const hasHours = videoLength[2];

        // if we have hours -> [h, m, s]
        // if we don't have hours -> [m, s] - only need [m]
        duration = hasHours
          ? videoLength[0] * 60 + videoLength[1]
          : videoLength[0];
      } else {
        const { number, unit } = titleMatch.groups;

        // if working with hours not minutes -> multiply by 60 to get hours
        duration = unit.toLowerCase().startsWith('h')
          ? parseInt(number * 60)
          : number;
      }

      // could be null - if we can't find a duration match -> grab the timecode (time code may be 17 min but the workout is 15 min, better than no info)

      return {
        channelName,
        subCount,
        imageLink,
        description,
        href,
        title,
        duration: Number(duration),
      };
    });

    // must return JSON serializable data
    return JSON.stringify(data);
  });

  return scrapedData;
}

async function scrapeWorkouts() {
  const browser = await puppeteer.launch({ headless: false });

  try {
    const viewport = { width: 800, height: 800 };

    const page = await browser.newPage();
    await page.setViewport(viewport);

    for (const channel of workoutChannels) {
      console.log({ channel });
      // load in videos on the page so it's scrapable
      await goToPageAndLoadAllVideoData(page, channel);

      // scrape the data now it's loaded
      const allWorkoutDataForChannel = await getWorkoutDataFromPage(page);

      console.log({ allWorkoutDataForChannel });

      console.log('got this far');

      // turn to array, make sure we filter out any broken scraped data
      const allWorkoutsList = JSON.parse(allWorkoutDataForChannel);
      const validWorkouts = allWorkoutsList.filter(allObjectKeysHaveValues);

      // insert our workouts for this channel into the db
      // gets awaited when awaiting acc
      await Workout.insertMany(validWorkouts, {
        ordered: false,
      });
    }

    await browser.close();
  } catch (err) {
    // would be unlikely but could happen :(
    console.error(err);
  }
}

agenda.define('scrape workouts', scrapeWorkouts);

(async function () {
  // IIFE to give access to async/await
  await agenda.start();
  await agenda.every('12 hours', 'scrape workouts');
})();
