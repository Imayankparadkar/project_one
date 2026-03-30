const https = require("https");
const ids = [
  "853923", "2871921", "4143414", "3129595", "2871929",  // 5 for music
  "11183354", "6538392", "4367503", "8140321", "11961448", // 5 for UGC
  "15392661", "11783852", "9866635", "8136368", "6530635", // 5 for Clipping
  "2759477", "11246740", "15486580", "11816613", "14418579" // backups
];
const suffixes = [
  "hd_1080_1920_30fps.mp4", "hd_1080_1920_25fps.mp4", "hd_1080_1920_24fps.mp4",
  "hd_1920_1080_30fps.mp4", "hd_1920_1080_25fps.mp4", "hd_1920_1080_24fps.mp4",
  "hd_720_1280_30fps.mp4", "hd_720_1280_25fps.mp4", "hd_720_1280_24fps.mp4",
  "sd_640_360_30fps.mp4", "sd_640_360_25fps.mp4", "sd_640_360_24fps.mp4",
  "sd_360_640_25fps.mp4"
];
let count = 0;
ids.forEach(id => {
  suffixes.forEach(suffix => {
    let url = "https://videos.pexels.com/video-files/" + id + "/" + id + "-" + suffix;
    https.request(url, { method: "HEAD" }, res => {
      if(res.statusCode === 200 && count < 30) {
        count++;
        console.log("WORKS: " + url);
      }
    }).end();
  });
});
