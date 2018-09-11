const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    title:String,
    createdDate: {
        type: Date,
        default: Date.Now
    },
});


const Note = mongoose.model("Note", NoteSchema);


module.exports = Note;



