const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cheerio = require('cheerio')
const bodyParser = require('body-parser');
const logger = require("morgan");

const app = express();
const PORT = process.env.PORT || 3000;

// require DB Models
var db = require("./models");

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// Db connection
mongoose.connect("mongodb://localhost/scraper", { useNewUrlParser: true });


// Set Handlebars.
const exphbs = require("express-handlebars"); 
app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");




// Routes
// =============================================================

require("./routes/scraper-routes.js")(app);
require("./routes/html-routes.js")(app);




app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });
  