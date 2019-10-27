const {Builder, By} = require('selenium-webdriver');
const config = require('./config');

module.exports = class SearchPage {
	constructor(url, browser) {
		this.driver = new Builder()
			.forBrowser(browser)
			.build();

		this._url = url;
		this._inputLocator = By.name('q');
		this._searchButtonLocator = By.xpath('.//form//input[contains(@aria-label, \'Поиск в Google\')]');
		this._secondPageLocator = By.xpath('.//a[contains(@aria-label, \'Page 2\')]');
		this._resultsLocator = By.className('rc');
		this._searchQuery = '';

		this._urlLocator = By.tagName('cite');
		this._headerLocator = By.tagName('h3');
		this._descriptionLocator = By.className('st');
		this._resultsStatLocator = By.id('resultStats');
	}

	get resultsStatLocator() {
		return this._resultsStatLocator;
	}

	get urlLocator() {
		return this._urlLocator;
	}

	get headerLocator() {
		return this._headerLocator;
	}

	get descriptionLocator() {
		return this._descriptionLocator;
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


	get secondPageLocator() {
		return this._secondPageLocator
	}


	get searchQuery() {
		return this._searchQuery
	}


	get resultsLocator() {
		return this._resultsLocator;
	};

	set searchQuery(query) {
		this._searchQuery = query
	};

	async quitDriver() {
		await this.driver.quit();
	};

	timeout(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	};

	async getElements(locator) {
		return await this.driver.findElements(locator);
	};

	async getElement(locator) {
		return await this.driver.findElement(locator);
	};


	async getSearchTotal() {
		const resultsCount = await this.getElement(this.resultsStatLocator);

		const resultsText = await resultsCount.getText();
		const myRegexp = /примерно ([\s\S]*?) \(/;

		const matches = myRegexp.exec(resultsText);
		console.log(resultsText);

		return Number.parseInt(matches[1].replace(' ', ''));
	}

	async doSearch() {
		await this.driver.get(this.url);
		const element = this.driver.findElement(this.inputLocator);
		await element.sendKeys(this.searchQuery);

		const submit = this.driver.findElement(this.searchButtonLocator);

		// waiting for autocomplete
		await this.timeout(2000);
		await submit.click();
	}

	async getText(element, search) {
		const url = await element.findElement(this.urlLocator).getText();
		const header = await element.findElement(this.headerLocator).getText();
		const description = await element.findElement(this.descriptionLocator).getText();

		const urlContains = this.findText(search, url);
		const descContains = this.findText(search, description);
		const headerContains = this.findText(search, header);

		return urlContains || descContains || headerContains
	}

	findText(search, entry) {
		return entry.toUpperCase().indexOf(search) !== -1
	}
};
