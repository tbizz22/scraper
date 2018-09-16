const mongoose = require('mongoose');
const db = require('../models')

module.exports = function (app) {
    app.get("/", function (req, res) {
        res.render("user")
    });

    app.post('/user', function (req, res) {
        console.log(req.body)
        db.User.create(req.body).then(function (dbUser) {
            const uID = dbUser._id;
            res.json(uID)
        }).catch(function (err) {
            // if the user already exists this gets that user                     
            const splitErr = err.errmsg.split('"')
            const dupKey = splitErr[1]
            // find the user based on the duplicate key in the user collection
            db.User.findOne({
                email: dupKey
            }).then(function (dbUser) {
                console.log(dbUser)
                const uID = dbUser._id
                res.send(uID)
            }).catch(function (err) {
                // things went real wrong if you end up here
                console.log(err)
            })
        })
    });

    app.get('/home/:id', function (req, res) {
        const uID = req.params.id;
        console.log(uID)
        db.Article.find({}).sort({
            createdAt: -1
        }).then(function (dbArticles) {
            res.render('items', {
                items: dbArticles,
                user: uID
            });
        })


    });


    app.get('/home/:userId/:itemId', function (req, res) {
        const userId = req.params.userId;
        const itemId = req.params.itemId;
        const mongoId = mongoose.Types.ObjectId(itemId)
        console.log(mongoId)


        db.Article.findById(mongoId).populate('comment').then(function (itemData) {
            console.log(itemData)
            res.render('item', {
                itemData: itemData
            }).catch(function (err) {
                console.log(err)
            })
        })
    })
};
