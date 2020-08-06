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
//body-parser middleware
app.use(express.urlencoded({extended: false}));

//controller for dinosaurs
app.use("/dinosaurs", require(".controllers/dinosaurs"));

//home route
app.get("/", function(req, res)
{
    res.render("home.ejs");
    //console.log("Home route was hit");
});

app.listen(8000);