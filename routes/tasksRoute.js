var db = require("../models");

module.exports = function (app) {
    app.get("/api/tasks/:id", function (req, res) {
        db.Tasks.findOne({
            where: {
                UserId: req.params.id
            },
            include: [db.User]
        }).then(function (x) {
            res.json(x)
        })
    })

    app.post("/api/tasks", function (req, res) {
        db.Tasks.create(req.body).then(function (data) {
            res.json(data)
        })
    })

    app.put("/api/tasks", function (req, res) {
        db.Tasks.update(
            req.body,
            {
                where: {
                    id: req.body.id
                }
            }).then(function (dbPost) {
                res.json(dbPost);
            });
    });

    app.delete("/api/tasks/:id", function(req, res) {
        db.Tasks.destroy({
          where: {
            id: req.params.id
          }
        })
          .then(function(dbPost) {
            res.json(dbPost);
          });
      });


}