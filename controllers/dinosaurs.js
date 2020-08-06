const express = require("express");
const router = express.Router();

//index route
router.get("/dinosaurs", function(req, res)
{
    //get the jsson from dinosaurs.json
    let dinosaurs = fs.readFileSync("./dinosaurs.json");
    //convert the json to javascript
    let dinoData = JSON.parse(dinosaurs);

    let nameFilter = req.query.nameFilter;
    //console.log(nameFilter);

    if (nameFilter)
    {
        dinoData = dinoData.filter(function(dino)
        {
            return dino.name.toLowerCase() === nameFilter.toLowerCase();
        });
    }

    //render our dino index page and pass it the dinoData as "myDinos"
    res.render("dinosaurs/index", {myDinos: dinoData})
    //console.log(dinoData);
    //res.send("DINOS");
});

// get the new dino form
router.get("/dinosaurs/new", (req,res)=>{
    res.render("dinosaurs/new");
});

//show route (uses URL parameter "id")
router.get("/dinosaurs/:id", function(req,res)
{
    let dinosaurs = fs.readFileSync("./dinosaurs.json");
    let dinoData = JSON.parse(dinosaurs);
    //grab the id parameter from the url and convert to int (was string orignally)
    let dinoIndex = parseInt(req.params.id);
    res.render("dinosaurs/show", {myDino: dinoData[dinoIndex]});
    //console.log(req.params);
});

//post a new dino
router.post("/dinosaurs", function(req, res)
{
    //get json dinos and convert to a js array of objects
    let dinosaurs = fs.readFileSync("./dinosaurs.json");
    let dinoData = JSON.parse(dinosaurs);
    //push new dino to the array
    dinoData.push(req.body)
    //convert dinoData back to JSON and write to dinosaurs.json file
    fs.writeFileSync("./dinosaurs.json", JSON.stringify(dinoData));
    //redirect to the index get route
    res.redirect("/dinosaurs");
    //console.log(req.body);
});

module.exports = router;