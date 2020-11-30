const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const items = require('../../Items');

// gets all items
router.get('/', (req, res) => {
	res.json(items); 
});

// get single item
router.get('/:id', (req, res) => {
	const found = items.some(item => parseInt(item.id) === parseInt(req.params.id));

	if(found) {
		res.json(items.filter(item => parseInt(item.id) === parseInt(req.params.id)));
	} else {
		res.status(400).json({ msg: `No item with id of ${req.params.id}.`});
	}
});

// add item
router.post('/', (req, res) => {
	const newItem = {
		id: uuid.v4(),
		item: req.body.item,
		state: false
	}

	if(!newItem.item) {
		return res.status(400).json({ msg: 'Please include item.', body: req.body });
	}

	items.push(newItem);
	// res.json(items); // use if sending json, aka not using templates
	res.redirect('/'); // if using templates, redirects to same page
	return
});

// update item
router.put('/:id', (req, res) => {
	const found = items.some(item => parseInt(item.id) === parseInt(req.body.id));

	if(found) {
		items.forEach(item => {
		if(parseInt(item.id) === parseInt(req.body.id) || item.id === req.body.id) {
				item.state = req.body.state;
			}
		});

		res.json(items);

	}
});

// delete single item
router.delete('/:id', (req, res) => {
	console.log("delete req body:", req.body);
	console.log("items:", items);

	// finds the index of the object within the array, where the element's id matches req.body.id
	let index = items.findIndex(item => item.id === parseInt(req.body.id) || item.id === req.body.id);

	items.splice(index, 1);

	// res.json(items);
	res.redirect('/');
	return
});

module.exports = router;