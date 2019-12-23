const {until} = require('selenium-webdriver');

module.exports = class BasePage {
	constructor(driver) {
		this.driver = driver

		this.installSelector = './/a[@class=\'header_installsteam_btn_content\']'
	}

	timeout(ms) {
		return new Promise(resolve => setTimeout(resolve, ms))
	}

	async getElements(locator) {
		const elements = await this.driver.wait(until.elementsLocated(locator))
		return elements
	}

	async getElement(locator) {
		const element = await this.driver.wait(until.elementLocated(locator));
		return element
	}

	async click(element) {
		await element.click()
	}

	async getText(element) {
		const text = await element.getText()
		return text
	}

	async hoverElement(selector) {
		const element = await this.getElement(selector);
		await this.driver.actions().move({origin: element}).perform();
	}
}
