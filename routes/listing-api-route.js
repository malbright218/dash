// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
var connection = require("../config/connection.js");

// Routes
// =============================================================
module.exports = function(app) {
  app.get("/api/jobs", function(req, res) {
    var dbQuery = "SELECT * FROM dash.Jobs";
    connection.query(dbQuery, function(err, result) {
      if (err) throw err;
      res.json(result);
    });
  });

  // app.get("/api/orders", function(req, res) {
  //   var dbQuery = "SELECT * FROM tbox.SalesOrderLine WHERE OrderNo > " + 13999;
  //   connection.query(dbQuery, function(err, result) {
  //     if (err) throw err;
  //     res.json(result);
  //   });
  // });
};
