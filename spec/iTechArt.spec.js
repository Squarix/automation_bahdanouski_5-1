const {Builder} = require('selenium-webdriver');
const {browser, searchResults, query, url} = require('./testData');
const config = require('./config');

const { getElement, getElements, quitDriver } = require('./helpers/util');

const SearchPage = require('./search.page');
const ResultPage = require('./results.page');

const logger = require('./helpers/logger');
const AllureReporter = require('jasmine-allure-reporter');

jasmine.DEFAULT_TIMEOUT_INTERVAL = config.timeout;
jasmine.getEnv().addReporter(new AllureReporter({
	resultsDir: 'allure'
}));

const driver = new Builder()
	.forBrowser(browser)
	.build();

const checkElements = async (elements, search) => {
	await Promise.all(elements.map(async element => {
		expect(await this.resultPage.getText(element)).toContain(search);
	}));
};

describe('Google ', () => {
	beforeAll(async () => {
		logger.trace('Before all')
		this.searchPage = new SearchPage(url, driver);
		this.resultPage = new ResultPage(driver);

		this.query = query.toUpperCase();
		this.searchPage.searchQuery = query;
	});

	beforeEach(async () => {
		logger.trace('Before each')
		await this.searchPage.doSearch();
	});

	it ('Check results amount', async () => {
		logger.info('Starting checking result amount');
		const total = await this.resultPage.getSearchTotal();
		logger.debug(`Total results ---> ${total}`);
		expect(total).toBeGreaterThan(searchResults);
		logger.info('Checking result amount finished')
	});

	it('Should check all results on first page', async () => {
		logger.info('Starting checking all results on first page');
		const firstPage = await getElements(driver, this.resultPage.resultsLocator);
		logger.debug(`Second page results amount ---> ${firstPage.length}`);
		await checkElements(firstPage, this.query);
		logger.info('Checking all results on first page finished');
	});

	it('Should check all result on second page', async () => {
		logger.info('Starting checking all results on second page');
		const secondPageButton = await getElement(driver, this.resultPage.secondPageLocator);
		await secondPageButton.click();

		const secondPage = await getElements(driver, this.resultPage.resultsLocator);
		logger.debug(`Second page results amount ---> ${secondPage.length}`);
		await checkElements(secondPage, this.query);
		logger.info('Checking all results on second page finished');

	});

	afterAll(async () => {
		logger.trace('After all started')
		await quitDriver(driver);
	});

});
