const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title: String,
    note: {
        type: Schema.Types.ObjectId,
        ref: 'Note'
    }
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;