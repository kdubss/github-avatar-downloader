const request = require("request");

console.log("Welcome to the GitHub Avatar Downloader!\n");

/**
 * [getRepoContributors GETs all the contributors of a GitHub repo]
 * @param  {[type]}   repoOwner [description]
 * @param  {[type]}   repoName  [description]
 * @param  {Function} cb        [Callback function to handle the asynchronous nature of results
 *                               that are returned]
 * @return {[type]}             [description]
 */
function getRepoContributors(repoOwner, repoName, cb) {

  const secret = require("./secrets");
  const options = {
    url: "https://api.github.com/repos" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      "User-Agent": "request"
      "Authorization": secret
    }
  };

  request(options, function(err, result, body) {
    cb(err, body);
  });

}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors", err);
  console.log("Result", result);
});