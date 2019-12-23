const {By} = require('selenium-webdriver')
const BasePage = require('./base.page')

const logger = require('../helpers/logger.helper')

class GamePage extends BasePage {
	constructor(driver) {
		super(driver)

		this.discountSelector = By.xpath('.//div[@id=\'game_area_purchase\']//div[@class=\'discount_pct\']')
		this.priceSelector = By.xpath('.//div[@id=\'game_area_purchase\']//div[@class=\'discount_final_price\']')
	}

	async getPriceAndDiscount() {
		logger.info('Getting price and discount')
		const price = await this.getPrice()
		logger.debug('Got price: ' + price)
		const discount = await this.getDiscount()
		logger.debug('Got discount: ' + discount)
		return {price, discount}
	}

	async getDiscount() {
		let discount;
		try {
			const discountEl = await this.driver.findElement(this.discountSelector)
			discount = discountEl.getAttribute('innerText')
		} catch (e) {}

		return discount
	}

	async getPrice() {
		const priceEl = await this.getElement(this.priceSelector)
		const price = await priceEl.getAttribute('innerText')
		return price.substr(0, price.length - 4)
	}
}

module.exports = GamePage
