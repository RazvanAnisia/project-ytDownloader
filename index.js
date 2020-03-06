const ora = require('ora');
const Downloader = require('./downloader');
const spinner = ora('Downloading...').start();
const ytdl = require('ytdl-core');
require('dotenv').config();

spinner.color = 'yellow';
const fs = require('fs');
let data;
try {
  data = fs.readFileSync(`${process.env.FILES_PATH}/list.txt`, 'utf8');
} catch (e) {
  console.log('Error:', e.stack);
}
const arrLinks = data
  .toString()
  .split('\n')
  .filter(el => el.length > 1);

const fetchVideo = (link, name) => {
  Downloader.download(link, name)
    .then(finishedObj => {
      //tell the spinner everything is done loading
      spinner.succeed(`Finished downloading...${finishedObj.videoTitle}`);
    })
    .catch(err => {
      //tell the spinner something went wrong.
      spinner.fail('Could not download that file. An Error occurred.');
      console.error(err);
    });
};

const getTitle = strLink => {
  ytdl.getInfo(strLink, function(err, info) {
    if (err) {
      console.log(err);
      spinner.fail('Could not get video title.');
    }
    return `${info.title}.mp3`;
  });
};

arrLinks.forEach(strLink => fetchVideo(strLink, getTitle(strLink)));
