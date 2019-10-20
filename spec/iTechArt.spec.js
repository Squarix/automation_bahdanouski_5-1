const { Builder, By, Key, until, WebElement } = require('selenium-webdriver');
const { browser, searchResults } = require('./testData');
const config = require('./config');

jasmine.DEFAULT_TIMEOUT_INTERVAL = config.timeout;

function findText(search, entry) {
	return entry.toUpperCase().indexOf(search) !== -1
}

async function checkElements(elements, search) {
	await Promise.all(elements.map(async element => {
		const urlElement = await element.findElement(By.tagName('cite'));
		const url = await urlElement.getText();

		const headerElement = await element.findElement(By.tagName('h3'));
		const header = await headerElement.getText();

		const descriptionElement = await element.findElement(By.className('st'));
		const description = await descriptionElement.getText();

		const urlContains = findText(search, url);
		const descContains = findText(search, description);
		const headerContains = findText(search, header);

		expect(urlContains || descContains || headerContains).toBe(true);
	}));
}

describe('Google ', () => {
	beforeAll(() => {
		this.driver = new Builder()
			.forBrowser(browser)
			.build();

		this.iTechArt = 'iTechArt'.toUpperCase();
	})

	it('Should check all results on first page', async () => {
		await this.driver.get('https://www.google.com/search?q=iTechArt');
		//const element = this.driver.findElement(By.name('q'));
		//element.sendKeys('ITechArt');
		//element.submit();

		//await this.driver.wait(until.elementLocated(By.id('search')), 15000, 'Looking for element');

		const firstPage = await this.driver.findElements(By.className('rc'));
		await checkElements(firstPage, this.iTechArt);

		//const secondPage = this.driver.findElement(By.xpath('.//a[contains(@aria-label, \'Page 2\')]'));
	});

	it('Should check all result on second page', async () => {
		await this.driver.get('https://www.google.com/search?q=iTechArt&start=10');
		const secondPage = await this.driver.findElements(By.className('rc'));
		await checkElements(secondPage, this.iTechArt);
	});

	afterAll(async () => {
		await this.driver.quit();
	})


});
