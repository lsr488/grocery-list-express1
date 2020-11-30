const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const prices = require('../../Prices');

// gets all prices
router.get('/', (req, res) => res.json(prices));

// get single price
router.get('/:id', (req, res) => {
	const found = prices.some(price => parseInt(price.id) === parseInt(req.params.id));

	if(found) {
		res.json(prices.filter(price => parseInt(price.id) === parseInt(req.params.id)));
	} else {
		res.status(400).json({ msg: `No price with id of ${req.params.id}`});
	}
});

// add price
router.post('/', (req, res) => {
	const newPrice = {
		id: uuid.v4(),
		price: req.body.price,
	}

	newPrice.price = parseFloat(newPrice.price);

	if(!newPrice.price) {
		return res.status(400).json({ msg: 'Please include price.', body: req.body });
	}

	prices.push(newPrice);
	// res.json(prices); // use if sending json, aka not using templates
	res.redirect('/'); // if using templates, redirects to same page
});

module.exports = router;