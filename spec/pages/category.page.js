const {By} = require('selenium-webdriver')
const BasePage = require('./base.page')
const logger = require('../helpers/logger.helper')

class CategoryPage extends BasePage {
	constructor(driver) {
		super(driver)
		// eslint-disable-next-line

		this.priceSelector = By.xpath(`.//div[@class='discount_final_price']`)
		this.discountSelector = By.xpath(`.//div[@class='discount_pct']`)
	}

	getGamesSelector(tab) {
		return By.xpath(`.//div[contains(@class, \'tab_content_ctn\')]//div[@id=\'${tab}\']//a[contains(@class, \'tab_item\')]`)
	}

	getTabSelector(tab) {
		return By.xpath(`.//div[@id=\'tab_select_${tab}\']`)
	}

	async getWithDiscountOrPrice() {
		logger.info('getting item with max price or max discount')
		const gamesAttributes = []
		const games = await this.getElements(this.getGamesSelector('NewReleasesTable'))
		for (const game of games) {
			const attributes = await this.populateGame(game)
			gamesAttributes.push(attributes)

		}

		const maxDiscount = this.getMaxDiscount(gamesAttributes)
		if (maxDiscount) {
			logger.debug('Max discount item ---->' + maxDiscount)
			return maxDiscount
		} else {
			const maxPrice = this.getMaxPrice(gamesAttributes)
			logger.debug('Max price item ---->' + maxPrice)
			return maxPrice
		}
	}

	async clickNewRelease() {
		logger.info('clicking new release tab')
		const newReleaseTab = await this.getElement(this.getTabSelector('NewReleases'))
		await this.click(newReleaseTab)
	}

	getMaxDiscount(games) {
		let max = 0
		let maxElement
		for (const game of games) {
			if (game.discount) {
				const discount = Number.parseInt(game.discount.substr(0, game.discount.length - 1))
				if (discount < max) {
					max = discount
					maxElement = game
				}
			}
		}

		return maxElement
	}

	getMaxPrice(games) {
		let max = 0
		let maxElement
		for (const game of games) {
			if (game.price) {
				const price = Number.parseFloat(game.price.substr(1, game.price.length))
				if (price > max) {
					max = price
					maxElement = game
				}
			}
		}

		return maxElement
	}

	async populateGame(element) {
		let discount
		const price = await element.findElement(this.priceSelector).getAttribute("innerText")
		try {
			const discountElement = await element.findElement(this.discountSelector)
			if (discountElement) {
				discount = await discountElement.getAttribute("innerText")
			}
		} catch (e) {}
		return { game: element, price, discount }
	}
}

module.exports = CategoryPage
