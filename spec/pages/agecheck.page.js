const {By} = require('selenium-webdriver')
const BasePage = require('./base.page')
const logger = require('../helpers/logger.helper')

class AgeCheckPage extends BasePage {
	constructor(driver) {
		super(driver)

		const allowedYear = (new Date()).getFullYear() - 21
		this.ageSelector = By.xpath(`.//select[@id='ageYear']`)
		this.ageOption = By.xpath(`.//select[@id='ageYear']/option[@value='${allowedYear}']`)
		this.openButtonSelector = By.xpath('.//span[contains(text(), \'Открыть страницу\')]/..')
	}

	async isAgeCheckPage() {
		const url = await this.driver.getCurrentUrl()
		if (url.includes('agecheck')) {
			return true
		}

		return false
	}

	async clickSelect() {
		logger.info('Clicking select birth year')
		const select = await this.getElement(this.ageSelector)
		await this.click(select)
	}

	async clickYearOption() {
		logger.info('Clicking year option')
		const option = await this.getElement(this.ageOption)
		await this.click(option)
	}

	async submitForm() {
		logger.info('Clicking view page')
		const submit = await this.getElement(this.openButtonSelector)
		await this.click(submit)
	}
}

module.exports = AgeCheckPage
