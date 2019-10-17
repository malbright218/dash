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

  app.post("/api/jobs", function(req, res) {
    console.log("New Job Data");
    console.log(req.body);

    var dbQuery =
      "INSERT INTO dash.Jobs (jobNo, customer, createdDate, createdBy, csr, sheets, rollSize, chopSize, optimumRoll, flute, topSheet, medium, liner, mill,lays, newJob, coating, doneCutting, oktoClose, closedby, closedDate, analyzedBy, comments, needsAnalysis, createdAt, updatedAt) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

    connection.query(
      dbQuery,
      [
        req.body.jobNo,
        req.body.customer,
        req.body.createdDate,
        req.body.createdBy,
        req.body.csr,
        req.body.sheets,
        req.body.rollSize,
        req.body.chopSize,
        req.body.optimumRoll,
        req.body.flute,
        req.body.topSheet,
        req.body.medium,
        req.body.liner,
        req.body.mill,
        req.body.lays,
        req.body.newJob,
        req.body.coating,
        req.body.doneCutting,
        req.body.oktoClose,
        req.body.closedby,
        req.body.closedDate,
        req.body.analyzedBy,
        req.body.comments,
        req.body.needsAnalysis
      ],
      function(err, result) {
        if (err) throw err;
        console.log("successfully posted");
        res.end();
      }
    );
  });
};
