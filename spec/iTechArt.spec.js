const {browser, searchResults, query, url} = require('./testData');
const config = require('./config');
const SearchPage = require('./search.page');

jasmine.DEFAULT_TIMEOUT_INTERVAL = config.timeout;


const checkElements = async (elements, search) => {
	await Promise.all(elements.map(async element => {
		expect(await this.searchPage.getText(element)).toContain(search);
	}));
};

describe('Google ', () => {
	beforeAll(async () => {
		this.searchPage = new SearchPage(url, browser);

		this.query = query.toUpperCase();
		this.searchPage.searchQuery = query;
	});

	beforeEach(async () => {
		await this.searchPage.doSearch();
	});

	it ('Check results amount', async () => {
		const total = await this.searchPage.getSearchTotal();
		expect(total).toBeGreaterThan(searchResults);
	});

	it('Should check all results on first page', async () => {
		const firstPage = await this.searchPage.getElements(this.searchPage.resultsLocator);
		await checkElements(firstPage, this.query);
	});

	it('Should check all result on second page', async () => {
		const secondPageButton = await this.searchPage.getElement(this.searchPage.secondPageLocator);
		await secondPageButton.click();

		const secondPage = await this.searchPage.getElements(this.searchPage.resultsLocator);
		await checkElements(secondPage, this.query);
	});

	afterAll(async () => {
		await this.searchPage.quitDriver();
	});

});
