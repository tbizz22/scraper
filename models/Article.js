const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
        unique: true
    },
    vendor: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: false,
    },
    msrp: {
        type: String,
        required: false,
    },
    popularity: {
        type: Number,
        required: false,
    },
    shipping: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.Now
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]
}, {
    timestamps: true
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;