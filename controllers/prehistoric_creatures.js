const express = require("express");
const router = express.Router();
const fs = require("fs");

router.get("/", function(req, res)
{
    let prehistorics = fs.readFileSync("././prehistoric_creatures.json");
    let prehisData = JSON.parse(prehistorics);

    res.render("prehistoric-creatures/index", {myPrehis: prehisData});
})

router.get("/new", function(req, res)
{
    res.render("prehistoric-creatures/new");
})

router.get("/:id", function(req, res)
{
    let prehistorics = fs.readFileSync("././prehistoric_creatures.json");
    let prehisData = JSON.parse(prehistorics);

    let prehisIndex = req.params.id;
    
    res.render("prehistoric-creatures/show", {myPrehis: prehisData[prehisIndex]});
})

router.post("/", function(req, res)
{
    let prehistorics = fs.readFileSync("././prehistoric_creatures.json");
    let prehisData = JSON.parse(prehistorics);

    prehisData.push(req.body);

    fs.writeFileSync("././prehistoric_creatures.json", JSON.stringify(prehisData));

    res.redirect("/prehistoric_creatures");
})

module.exports = router;