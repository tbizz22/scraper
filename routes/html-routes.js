const mongoose = require('mongoose');
const db = require('../models')

module.exports = function (app) {
    app.get("/", function (req, res) {
        res.render("user")
            });

    app.post('/user', function (req, res, data) {
        console.log(req.body)

        db.User.create(req.body).then(function (dbUser) {
            res.json(dbUser)
            console.log(dbUser)
            const uID = dbUser._id
            res.redirect(`/home/${uID}`)
        }).catch(function (err) {
            // if the user already exists this gets that user
            // res.json(err)            
            const splitErr = err.errmsg.split('"')
            const dupKey = splitErr[1]
            // find the user based on the duplicate key in the user collection
            db.User.findOne({
                email:dupKey
            }).then(function (dbUser) {
                console.log(dbUser)
                const uID = dbUser._id
                res.redirect(`/home/${uID}`)
            }).catch(function (err) {
                // things went real wrong if you end up here
                console.log(err)
            })
        })

    });

    app.get('/home/:id', function(req, res) {
        res.render('items');
    });
}
