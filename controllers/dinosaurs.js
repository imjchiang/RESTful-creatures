const express = require("express");
const router = express.Router();
//will use to read json files
const fs = require("fs");

//index route
router.get("/", function(req, res)
{
    //get the jsson from dinosaurs.json
    let dinosaurs = fs.readFileSync("././dinosaurs.json");
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
router.get("/new", (req,res)=>{
    res.render("dinosaurs/new");
});

//get the update form
router.get("/edit/:id", function(req, res)
{
    let dinosaurs = fs.readFileSync("././dinosaurs.json")
    let dinoData = JSON.parse(dinosaurs);

    res.render("dinosaurs/edit", {dino: dinoData[req.params.id], dinoId: req.params.id});
})

//put route [uses URL paramete "id"]
router.put("/:id", function(req, res)
{
    let dinosaurs = fs.readFileSync("././dinosaurs.json");
    let dinoData = JSON.parse(dinosaurs);

    //update the indo
    //reassign the name and type fields of the dinosaur
    dinoData[req.params.id].name = req.body.name;
    dinoData[req.params.id].type = req.body.type;

    //save the edited dinosaurs information
    fs.writeFileSync("././dinosaurs.json", JSON.stringify(dinoData));
    res.redirect("/dinosaurs");
})

//show route (uses URL parameter "id")
router.get("/:id", function(req,res)
{
    let dinosaurs = fs.readFileSync("././dinosaurs.json");
    let dinoData = JSON.parse(dinosaurs);
    //grab the id parameter from the url and convert to int (was string orignally)
    let dinoIndex = parseInt(req.params.id);
    res.render("dinosaurs/show", {myDino: dinoData[dinoIndex]});
    //console.log(req.params);
});

//post a new dino
router.post("/", function(req, res)
{
    //get json dinos and convert to a js array of objects
    let dinosaurs = fs.readFileSync("././dinosaurs.json");
    let dinoData = JSON.parse(dinosaurs);
    //push new dino to the array
    dinoData.push(req.body)
    //convert dinoData back to JSON and write to dinosaurs.json file
    fs.writeFileSync("././dinosaurs.json", JSON.stringify(dinoData));
    //redirect to the index get route
    res.redirect("/dinosaurs");
    //console.log(req.body);
});

router.delete("/:id", function(req, res)
{
    let dinosaurs = fs.readFileSync("././dinosaurs.json");
    //another way to parse without creating a new variable
    dinosaurs = JSON.parse(dinosaurs);

    //delete the dinosaur from the dinosaurs json file
    //use splice() method to delete it from the array that's saved in the variable dinosaurs
    dinosaurs.splice(req.params.id, 1);

    //save the dinosaurs back into the JSON file
    fs.writeFileSync("././dinosaurs.json", JSON.stringify(dinosaurs));

    res.redirect("/dinosaurs");
});

module.exports = router;