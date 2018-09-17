const mongoose = require('mongoose');
const db = require('../models')

module.exports = function (app) {
    app.get("/", function (req, res) {
        res.render("user")
    });

    // verify the user joining the site
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

    // show the homepage for a given user
    app.get('/home/:id', function (req, res) {
        const uID = req.params.id;
        console.log(uID)
        db.Article.find({}).sort({
            createdAt: -1
        }).populate().then(function (dbArticles) {
            res.render('items', {
                items: dbArticles,
                user: uID
            });
        })
    });

    // view an individual item 
    app.get('/home/:userId/:itemId', function (req, res) {
        const userId = req.params.userId;
        const itemId = req.params.itemId;
        const mongoId = mongoose.Types.ObjectId(itemId)
        console.log(mongoId)


        db.Article
            .findById(mongoId)
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }
            })
            .then(function (itemData) {
                console.log(itemData)
                res.render('item', {
                        itemData: itemData,
                        comment: itemData.comments,
                        user: userId
                    })
                    .catch(function (err) {
                        console.log(err)
                    })
            })
    })


    // create a new comment
    app.post('/home/:userId/:itemId', function (req, res) {
        const commentObj = {
            body: req.body.commentBody,
            user: req.body.userId
        };

        db.Comment.create(commentObj).then(function (dbComment) {
            return db.Article.findOneAndUpdate({
                _id: req.body.itemId
            }, {
                $push: {
                    comments: dbComment._id
                }
            }, {
                new: true
            });
        }).then(function (dbItem) {
            res.send("Comment Added Succesfully")
        }).catch(function (err) {
            res.json(err);
        });
    });

    app.post('/home/:userId/:itemId/saveArticle', function (req, res) {
        db.User.findOneAndUpdate({
            _id: req.body.userId
        }, {
            $push: {
                articles: req.body.itemId
            }
        }, {
            new: true
        }).then(function (dbUser) {
            console.log(dbUser)
        }).catch(function (error) {
            res.json(err);
        });
    });

    app.get('/savedItems/:userId', function (req, res) {
        db.User.findById(req.params.userId)
            .populate('articles')
            .then(function (dbUser) {
                console.log(dbUser)
                res.render('savedItems', {
                    items: dbUser.articles,
                    user: req.params.userId
                })

            }).catch(function (err) {
                res.json(err)
            })


    });
};
