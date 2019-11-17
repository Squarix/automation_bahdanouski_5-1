const {By} = require('selenium-webdriver');
const {getElement} = require('./helpers/util');

module.exports = class ResultsPage {
	constructor(driver) {
		this.driver = driver;
		this._secondPageLocator = By.xpath('.//a[contains(@aria-label, \'Page 2\')]');

		this._resultsLocator = By.className('rc');
		this._resultsStatLocator = By.id('resultStats');

	}

	get resultsStatLocator() {
		return this._resultsStatLocator;
	}

	get resultsLocator() {
		return this._resultsLocator;
	};

	get secondPageLocator() {
		return this._secondPageLocator
	}

	async getSearchTotal() {
		const resultsCount = await getElement(this.driver, this.resultsStatLocator);

		const resultsText = await resultsCount.getText();
		const myRegexp = /примерно ([\s\S]*?) \(/;

		const matches = myRegexp.exec(resultsText);
		console.log(resultsText);

		return Number.parseInt(matches[1].replace(' ', ''));
	}

	async getText(element) {
		const text = await element.getText();
		return text.toUpperCase();
	}
}
