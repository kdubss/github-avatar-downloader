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
    // const avatarURLs


    for (var i = 0; i < repos.length; i++) {
      console.log(repos[i].avatar_url);
    }
    // cb(err, body);
  });

}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors", err);
  console.log("Result", result);
});