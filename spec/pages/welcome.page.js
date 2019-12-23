const {By} = require('selenium-webdriver')
const BasePage = require('./base.page')

const logger = require('../helpers/logger.helper')

const url = 'https://store.steampowered.com'

class WelcomePage extends BasePage {
	constructor(driver) {
		super(driver)
		this.menuSelector = By.xpath('.//div[contains(@class, "tab  flyout_tab") and contains(., "Игры")]')
		this.actionSelector = By.xpath('.//a[contains(text(), \'Экшен\')]')

	}

	async getPage() {
		await this.driver.get(url)
	}

	async hoverMenu() {
		logger.info('hover menu')
		await this.hoverElement(this.menuSelector)
	}

	async clickAction() {
		logger.info('clicking action item')
		const element = await this.getElement(this.actionSelector)
		this.click(element)
	}
}

module.exports = WelcomePage
