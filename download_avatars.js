const request = require("request");

console.log("Welcome to the GitHub Avatar Downloader!\n");

/**
 * [getRepoContributors GETs all the contributors of a GitHub repo]
 * @param  {[String]}   repoOwner [Name of user who owns the repo]
 * @param  {[String]}   repoName  [Name of the Repo]
 * @param  {Function} cb        [Callback function to handle the asynchronous nature of results
 *                               that are returned]
 * @return {[type]}             [description]
 */
function getRepoContributors(repoOwner, repoName, cb) {

  const secrets = require("./secrets");
  const options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    // url: "https://api.github.com/user/repos",
    headers: {
      "User-Agent": "request",
      Authorization: "token " + secrets.GITHUB_TOKEN
    }
  };

  request(options, function(err, result, body) {
    const repos = JSON.parse(body);

    for (var i = 0; i < repos.length; i++) {
      // console.log(repos[i].avatar_url);
      downloadImageByURL(repos[i].avatar_url, "./avatar_imgs/" + repos[i].login + ".jpg");
    }
  });

};

/**
 * [downloadImageByURL Downloads the avatar image from a url that's passed, and saves that image
 *  (in .jpg) into the directory specified by filePath]
 * @param  {[String]} url      [Avatar URL]
 * @param  {[String]} filePath [Location where all avatar images are saved]
 * @return {[Image]}           [Avatar jpg image downloaded, and saved to the path specified by
 *                              filePath]
 */
function downloadImageByURL(url, filePath) {
  // ...
  const request = require("request");
  const fs = require("fs");

  request.get(url)
         .on("error", function(err) {
          throw err;
         })
         .on("response", function(response) {
          console.log(response.statusCode);
          console.log(response.statusMessage);
         })
         .pipe(fs.createWriteStream(filePath));
};

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors", err);
  console.log("Result", result);
});