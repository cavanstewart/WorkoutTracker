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
    },
    user_id: {
        type: String
    }
});


module.exports = Item = mongoose.model('item', ItemSchema);