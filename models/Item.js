const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema

const ItemSchema = new Schema({
    exercise: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});


module.exports = Item = mongoose.model('item', ItemSchema);