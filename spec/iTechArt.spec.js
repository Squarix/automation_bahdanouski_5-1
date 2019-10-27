const {Builder, By} = require('selenium-webdriver');
const {browser, searchResults, url, query} = require('./testData');
const config = require('./config');

jasmine.DEFAULT_TIMEOUT_INTERVAL = config.timeout;

function findText(search, entry) {
	return entry.toUpperCase().indexOf(search) !== -1
}

async function checkElements(elements, search) {
	await Promise.all(elements.map(async element => {
		const url = await element.findElement(By.tagName('cite')).getText();
		const header = await element.findElement(By.tagName('h3')).getText();
		const description = await element.findElement(By.className('st')).getText();

		const urlContains = findText(search, url);
		const descContains = findText(search, description);
		const headerContains = findText(search, header);

		expect(urlContains || descContains || headerContains).toBe(true);
	}));
}

describe('Google ', () => {
	beforeAll(async () => {
		this.driver = new Builder()
			.forBrowser(browser)
			.build();

		this.query = query.toUpperCase();
	});

	beforeEach(async () => {
		await doSearch();
	});

	it ('Check results amount', async () => {
		const resultsCount = this.driver.findElement(By.id('resultStats'));
		const resultsText = await resultsCount.getText();

		console.log(resultsText);

		const myRegexp = /примерно ([\s\S]*?) \(/;
		const match = myRegexp.exec(resultsText)[1];
		const total = Number.parseInt(match.replace(' ', ''));

		expect(total > searchResults).toBe(true);
	});

	it('Should check all results on first page', async () => {
		const firstPage = await this.driver.findElements(By.className('rc'));
		await checkElements(firstPage, this.query);
	});

	it('Should check all result on second page', async () => {
		const secondPageButton = this.driver.findElement(By.xpath('.//a[contains(@aria-label, \'Page 2\')]'));
		await secondPageButton.click();

		const secondPage = await this.driver.findElements(By.className('rc'));
		await checkElements(secondPage, this.query);
	});


	function timeout(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	const doSearch = async () => {
		await this.driver.get(url);
		const element = this.driver.findElement(By.name('q'));
		await element.sendKeys(query);

		const submit = this.driver.findElement(By.xpath('.//form//input[contains(@aria-label, \'Поиск в Google\')]'));

		// waiting for autocomplete
		await timeout(1000);
		await submit.click();
	};

	afterAll(async () => {
		await this.driver.quit();
	});

});
