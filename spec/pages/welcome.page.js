const {By} = require('selenium-webdriver')
const BasePage = require('./base.page')

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
		await this.hoverElement(this.menuSelector)
	}

	async clickAction() {
		const element = await this.getElement(this.actionSelector)
		this.click(element)
	}
}

module.exports = WelcomePage
