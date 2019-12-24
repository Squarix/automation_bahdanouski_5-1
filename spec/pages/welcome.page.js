const {By} = require('selenium-webdriver')
const BasePage = require('./base.page')

const logger = require('../helpers/logger.helper')

const url = 'https://store.steampowered.com'

class WelcomePage extends BasePage {
	constructor(driver) {
		super(driver)
	}

	getMenuItemSelector(item) {
		return By.xpath(`.//a[contains(text(), '${item}')]`)
	}

	getMenuSelector(menu) {
		return By.xpath(`.//div[contains(@class, "tab  flyout_tab") and contains(., "${menu}")]`)
	}

	async getPage() {
		await this.driver.get(url)
	}

	async hoverMenu() {
		logger.info('hover menu')
		await this.hoverElement(this.getMenuSelector('Игры'))
	}

	async clickCategory(category) {
		logger.info('clicking action item')
		const element = await this.getElement(this.getMenuItemSelector(category))
		this.click(element)
	}
}

module.exports = WelcomePage
