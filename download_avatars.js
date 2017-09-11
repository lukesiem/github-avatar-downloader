var request = require('request');
var GITHUB_USER = "lukesiem"
var GITHUB_TOKEN = "9ee477849f0ca896573f09ffe9bfc323dc80c0b2" 
var filepath = "./Avatars/"
var term1 = process.argv[2];
var term2 = process.argv[3];

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
			// adds the file path and login name for each user avatar
			for (contributor of myVar){
				downloadImageByURL(contributor.avatar_url,filepath + contributor.login );
	}
	return;
   }

  });
}

function downloadImageByURL(url,filePath){
	var fs = require('fs');

request.get(url)              
       .on('error', function (err) {                                   
         throw err; 
       })
       .on('response', function (response) {  
      console.log("download complete.")                        
         console.log('Response Status Code: ', response.statusCode );
       })
       //creates the image file in my Avatar folder
       .pipe(fs.createWriteStream(filePath));

       console.log("donwloading image...")  
       	

	
}

//error messages addition. If the conditions are met the function will call. 

if (term1 && term2 && term1 !== "" && term2 !== ""){
	getRepoContributors(term1, term2, function(err, result) {
		console.log("Errors:", err);
  		console.log("Result:", result);
  	});
}
else {
	console.log("enter two valid terms");
}
console.log('Welcome to the GitHub Avatar Downloader!');

