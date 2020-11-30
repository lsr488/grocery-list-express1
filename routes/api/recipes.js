const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const recipes = require('../../Recipes');


// gets all recipes
router.get('/', (req, res) => res.json(recipes));

// get single recipe
router.get('/:id', (req, res) => {
	const found = recipes.some(recipe => parseInt(recipe.id) === parseInt(req.params.id));

	if(found) {
		res.json(recipes.filter(recipe => parseInt(recipe.id) === parseInt(req.params.id)));
	} else {
		res.status(400).json({ msg: `No recipe with id of ${req.params.id}`});
	}
});

// add recipe
router.post('/', (req, res) => {
	const newRecipe = {
		id: uuid.v4(),
		url: req.body.url,
		name: req.body.name,
		notes: req.body.notes
	}

	if(!newRecipe.name) {
		return res.status(400).json({ msg: 'Please include recipe name.', body: req.body, newRecipe: newRecipe });
	}

	recipes.push(newRecipe);
	// res.json(recipes); // use if sending json, aka not using templates
	res.redirect('/'); // if using templates, redirects to same page
});

module.exports = router;