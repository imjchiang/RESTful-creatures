const express = require("express");
const router = express.Router();
const fs = require("fs");

router.get("/", function(req, res)
{
    let prehistorics = fs.readFileSync("././prehistoric_creatures.json");
    let prehisData = JSON.parse(prehistorics);

    res.render("prehistoric-creatures/index", {myPrehis: prehisData});
})

module.exports = router;