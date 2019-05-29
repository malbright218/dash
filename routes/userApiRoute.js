var db = require("../models");

module.exports = function (app) {

    app.get("/api/user", function (req, res) {
        db.User.findAll({}).then(function (data) {
            res.json(data)
        });
    });

    app.post("/api/user", function (req, res) {
        db.User.create(req.body).then(function (data) {
            res.json(data)
        })
    })
    
    app.put("/api/user", function (req, res) {
        db.User.update(
            req.body,
            {
                where: {
                    id: req.body.id
                }
            }).then(function (dbPost) {
                res.json(dbPost);
            });
    });

    app.get("/api/user/:id", function(req, res) {
        db.User.findOne({
            where: {
                id: req.params.id
            },
            include: [db.Tasks]
        }).then(function(x) {
            res.json(x)
        })
    })
    
};