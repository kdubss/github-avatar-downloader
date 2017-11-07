const secrets = require("./secrets"); //Access GitHub personal ID token
const request = require("request");
const fs = require("fs");

const args = process.argv.slice(2); //Parsing command line arguments

repoOwner = args[0];
repoName = args[1];

console.log("Welcome to the GitHub Avatar Downloader!\n");

/**
 * [getRepoContributors GETs all the contributors of a GitHub repo,
 *  parses the url of their avatars,
 *  downloads the avatar images,
 *  saves each image as a .jpg with the 'downloadImageByURL()' function]
 * @param  {[String]}   repoOwner [Name of user who owns the repo]
 * @param  {[String]}   repoName  [Name of the Repo]
 * @param  {Function}   cb        [Callback function to handle the asynchronous nature of results
 *                                 that are returned]
 */
function getRepoContributors(repoOwner, repoName, cb) {

  if (!repoOwner && !repoName) {

    console.log("Please enter 1st, the repo owner then 2, the repo name!\n");

  }

  const options = {

    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      "User-Agent": "request",
      Authorization: "token " + secrets.GITHUB_TOKEN

    }

  };

  request(options, function(err, result, body) {

    const repos = JSON.parse(body);

    for (var i = 0; i < repos.length; i++) {

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

  request.get(url)
         .on("error", function(err) {
          throw err;
         })
         .on("response", function(response) {
          // Prints out status of each download
          console.log("Status of avatar-url to download:")
          console.log(response.statusCode);
          console.log(response.statusMessage, "\n");
         })
         .pipe(fs.createWriteStream(filePath));

};

getRepoContributors(repoOwner, repoName, function(err, result) {

  console.log("Errors", err);
  console.log("Result", result);

});