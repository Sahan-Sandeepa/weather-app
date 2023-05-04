const router = require('express').Router();
let City = require('../models/city.model');

router.route('/cities').get((req, res) => {
    City.find()
        .then(cities => res.json(cities))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
