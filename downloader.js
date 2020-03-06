require('dotenv').config();

const isURL = function(str) {
  const urlRegex =
    '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$';
  const url = new RegExp(urlRegex, 'i');
  return str.length < 2083 && url.test(str);
};

const YoutubeMp3Downloader = require('youtube-mp3-downloader');
const downloader = new YoutubeMp3Downloader({
  ffmpegPath: '/usr/bin/ffmpeg',
  outputPath: process.env.FILES_PATH,
  youtubeVideoQuality: 'highest',
  queueParallelism: 3,
  progressTimeout: 5000
});

let url = require('url');
module.exports = {
  download: function(videoIdOrLink, fileName) {
    return new Promise((resolve, reject) => {
      if (!videoIdOrLink) {
        throw new Error('Please enter a valid video id or link');
      }
      let videoId = videoIdOrLink;
      if (isURL(videoIdOrLink)) {
        let urlQueryObj = url.parse(videoIdOrLink, true).query;
        videoId = urlQueryObj.v;
      }
      downloader.download(videoId, fileName);
      downloader.on('finished', function(err, data) {
        resolve(data);
      });
      downloader.on('error', function(err) {
        reject(err);
      });
    });
  },
  downloader
};
