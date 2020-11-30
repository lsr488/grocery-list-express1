const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const morgan = require('morgan'); // for logging to the console
const items = require('./Items');
const recipes = require('./Recipes');
const prices = require('./Prices');

// set app
const app = express();

// handlebars helpers
const { addPrices, fixedTwoDecimals } = require('./helpers/hbs');

// handlebars middleware
app.engine('.hbs', exphbs({ helpers: {
	addPrices, fixedTwoDecimals
}, defaultLayout: 'main', extname: '.hbs'} ));app.set('view engine', '.hbs');

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// logging
app.use(morgan('dev'));

// Set static folder - usually either static folder OR templates, not both
app.use(express.static('public'));

// ROUTES
app.get('/', (req, res) => {
  // to server a static file! vs res.send() or res.render()
  // res.sendFile(path.join(__dirname, 'public', 'index.html'));

	  // to serve info + models to handlebars template
	  res.render('index', {
			items: items,
			recipes: recipes,
			prices: prices
		}
	);
});

app.get('/routes/index', (req, res) => {
	res.render('index');
});

// API Routes
app.use('/api/items', require('./routes/api/items'));
app.use('/api/recipes', require('./routes/api/recipes'));
app.use('/api/prices', require('./routes/api/prices'));

// set port
const PORT = process.env.PORT || 3000;

// listen for server
app.listen(PORT, console.log(`Server running on port ${PORT}...`));