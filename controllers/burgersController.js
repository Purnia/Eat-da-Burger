var express = require("express");

var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
//returns all burgers inside db
router.get("/", function(req, res) {
  burger.selectAll(function(data) {
    var hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject); //this will allow the data to show up as described in index.handlebars
  });
});

// //holds all burgers in json object
// router.get("/api/burgers", function(req, res) {
//   burger.selectAll(function(result) {
//     res.json(result);
//   });
// });

//posts new burgers inside db
router.post("/api/burgers", function(req, res) {
  console.log("in the post route");
  burger.insertOne([
    "burger_name", "devoured"
   ], [
     req.body.burger_name, false
   ], function(result){
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
  });

//update existing burgers in db
router.put("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);
  console.log('req.body: ', req.body)

  burger.update({
    devoured: true
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// Export routes for server.js to use.
module.exports = router;
