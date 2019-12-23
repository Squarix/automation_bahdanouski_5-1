const { By } = require('selenium-webdriver')
const BasePage = require('./base.page')
const logger = require('../helpers/logger.helper')
// .//div[@id='about_greeting']//div[@class='about_install_wrapper']//a[@class='about_install_steam_link']

const url = 'https://store.steampowered.com/about/'

class InstallPage extends BasePage {
	constructor(driver) {
		super(driver)
		this.installButtonSelector = By.xpath('.//div[@id=\'about_greeting\']//div[@class=\'about_install_wrapper\']//a[@class=\'about_install_steam_link\']')
	}

	async getPage() {
		await this.driver.get(url)
	}

	async clickInstall() {
		logger.info('clicking install')
		const installButton = await this.getElement(this.installButtonSelector)
		await this.click(installButton)
	}

}

module.exports = InstallPage
