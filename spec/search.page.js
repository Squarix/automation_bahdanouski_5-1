const {By} = require('selenium-webdriver');
const {timeout} = require('./helpers/util');
const logger = require('./helpers/logger');

module.exports = class SearchPage {
	constructor(url, driver) {
		this.driver = driver;
		this._url = url;
		this._inputLocator = By.name('q');
		this._searchButtonLocator = By.xpath('.//form//input[contains(@aria-label, \'Поиск в Google\')]');
		this._searchQuery = '';
	}

	get url() {
		return this._url;
	}


	get inputLocator() {
		return this._inputLocator;
	}


	get searchButtonLocator() {
		return this._searchButtonLocator;
	}

	get searchQuery() {
		return this._searchQuery
	}

	set searchQuery(query) {
		this._searchQuery = query
	};

	async doSearch() {
		await this.driver.get(this.url);
		logger.debug('Got search page');
		const element = this.driver.findElement(this.inputLocator);
		await element.sendKeys(this.searchQuery);
		logger.debug('Send query');
		const submit = this.driver.findElement(this.searchButtonLocator);

		// waiting for autocomplete
		await timeout(2000);
		await submit.click();
		logger.debug('Clicked on search button')
	}

};
