//const used for non-reassignment
const express = require("express");
const app = express();
//create an instance of layouts
const ejsLayouts = require("express-ejs-layouts");
//will use to read json files
const fs = require("fs");

//tell express we're using ejs
app.set("view engine", "ejs");
//tell express to let us use a layout template
app.use(ejsLayouts);

//home route
app.get("/", function(req, res)
{
    res.render("home.ejs");
    //console.log("Home route was hit");
});

//index route
app.get("/dinosaurs", function(req, res)
{
    //get the jsson from dinosaurs.json
    let dinosaurs = fs.readFileSync("./dinosaurs.json");
    //convert the json to javascript
    let dinoData = JSON.parse(dinosaurs);
    //render our dino index page and pass it the dinoData as "myDinos"
    res.render("dinosaurs/index", {myDinos: dinoData})
    //console.log(dinoData);
    //res.send("DINOS");
})

//show route (uses URL parameter "id")
app.get("/dinosaurs/:id", function(req,res)
{
    let dinosaurs = fs.readFileSync("./dinosaurs.json");
    let dinoData = JSON.parse(dinosaurs);
    //grab the id parameter from the url and convert to int (was string orignally)
    let dinoIndex = parseInt(req.params.id);
    res.render("dinosaurs/show", {myDino: dinoData[dinoIndex]});
    //console.log(req.params);
});

app.listen(8000);