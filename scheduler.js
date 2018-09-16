var request = require('request');

// Get the latest and greates
updateItems()


function updateItems() {
    request("https://slickscraper.herokuapp.com/api/scrape", function (error, response, body) {
        console.log("Error: " + error);
        console.log("Response: " + (response);
        console.log("Body: " + body);
    })
};
