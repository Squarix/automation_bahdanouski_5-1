const { Builder } = require('selenium-webdriver')

const config = require('./config')
const logger = require('./helpers/logger.helper')
const WelcomePage = require('./pages/welcome.page')
const CategoryPage = require('./pages/category.page')
const GamePage = require('./pages/game.page')
const AgeCheckPage = require('./pages/agecheck.page')
const InstallPage = require('./pages/install.page')

const DownloadHelper = require('./helpers/download.helper')


require('chromedriver')
require('geckodriver')

jasmine.DEFAULT_TIMEOUT_INTERVAL = config.timeout;

const driver = new Builder()
	.forBrowser(config.browser)
	.build()



describe('Testing steam store ', () => {
	beforeAll(async () => {
		await driver.manage().window().setRect({width: 1920, height: 1080, x: 0, y: 0})

		this.gamePage = new GamePage(driver)
		this.welcomePage = new WelcomePage(driver)
		this.installPage = new InstallPage(driver)
		this.categoryPage = new CategoryPage(driver)
		this.ageCheckPage = new AgeCheckPage(driver)

		this.downloadHelper = new DownloadHelper()
	})

	beforeEach(async () => {

	})

	it('validates price and discount', async () => {
		await this.welcomePage.getPage()
		await this.welcomePage.hoverMenu()
		await this.welcomePage.clickAction()

		await this.categoryPage.clickNewRelease()
		const game = await this.categoryPage.getWithDiscountOrPrice()

		await this.categoryPage.click(game.game)

		await this.ageCheckPage.timeout(2000)
		if (await this.ageCheckPage.isAgeCheckPage()) {
			await this.ageCheckPage.clickSelect()
			await this.ageCheckPage.clickYearOption()
			await this.ageCheckPage.submitForm()
		}

		const gameParams = await this.gamePage.getPriceAndDiscount()
		expect([gameParams.discount, gameParams.price]).toEqual([game.discount, game.price])
	})

	it('downloading steam', async () => {
		await this.installPage.getPage()
		await this.installPage.clickInstall()

		let isDownloading = true
		while (isDownloading) {
			isDownloading = await this.downloadHelper.isDownloading()
			await this.installPage.timeout(100)
		}

		logger.info('Temp file disappeared')
		let isDownloaded = await this.downloadHelper.isDownloaded('steam_latest')
		logger.info('File downloaded: ' + isDownloaded)
		expect(isDownloaded).toBe(true)
	})

	afterAll(async () => {
		await driver.quit();
	})

})
