var request = require('request');
var GITHUB_USER = "lukesiem"
var GITHUB_TOKEN = "9ee477849f0ca896573f09ffe9bfc323dc80c0b2" 

function getRepoContributors(repoOwner,repoName,cb){
	var requestURL = 'https://' + GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/'
	+ repoOwner + "/" + repoName + '/contributors';

	var myObj = {
		url: requestURL,
		headers:{
			"User-Agent": "lukesiem"
		}
	}

	request.get(myObj,function(error,response,body){
		//handle an error from request
		if(error) {
			// call the callback funtion with error
			callback(error);
			return;
		}

		if(response && response.statusCode === 200) {
			// request OK, Parse Data
			var myVar = JSON.parse(body);
			for (contributor of myVar){
		console.log(contributor.avatar_url);
	}
	return;
   }

  });
}


getRepoContributors("jquery", "jquery", function(err, result) {
 
  console.log("Errors:", err);
  console.log("Result:", result);
});
console.log('Welcome to the GitHub Avatar Downloader!');

