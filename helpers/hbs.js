module.exports = {
	addPrices: function(prices) {
		let onlyPrices = [];
		prices.forEach(price => {
			onlyPrices.push(price.price);
		});

		let sums = (accumulator, currentValue) => accumulator + currentValue;
		
		let beforeSalesTax = onlyPrices.reduce(sums);
		let afterSalesTax = beforeSalesTax * 1.0875;

		return afterSalesTax.toFixed(2);
	},
	fixedTwoDecimals: function(price) {
		return price.toFixed(2);
	}
}