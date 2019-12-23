const {By} = require('selenium-webdriver')
const BasePage = require('./base.page')

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
		const select = await this.getElement(this.ageSelector)
		await this.click(select)
	}

	async clickYearOption() {
		const option = await this.getElement(this.ageOption)
		await this.click(option)
	}

	async submitForm() {
		const submit = await this.getElement(this.openButtonSelector)
		await this.click(submit)
	}
}

module.exports = AgeCheckPage
