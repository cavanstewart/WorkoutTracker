const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

//Item Model
const Item = require('../../models/Item')


// @route  GET api/items
// @desc   GET Items on a day
// @access Public
router.get('/:day/:month/:year/:user', (req, res) => {

    //const user_id = req.params.user;

    const y = parseInt(req.params.year);
    const m = parseInt(req.params.month);
    const d = parseInt(req.params.day);

    

    //var curr = req.params.date
    const start = new Date(y, m, d);
    const end = new Date(y, m, d+1);

    

    //console.log(start)
    //console.log(end)

    Item.find({ $and: [ 
        { 'date' : {$gte: start, $lt: end} }, 
        { 'user_id' : req.params.user }
    ] })
        .then(items => res.json(items))
});

// @route  POST api/items
// @desc   Create An Item
// @access Private
router.post('/', auth, (req, res) => {
    const newItem = new Item({
        exercise: req.body.exercise,
        reps: req.body.reps,
        user_id: req.body.user_id
    });

    newItem.save().then(item => res.json(item));
});

// @route   DELETE api/items
// @desc    Delete An Item
// @access  Private
router.delete('/:id', auth, (req, res) => {
    Item.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}));
})


module.exports = router;