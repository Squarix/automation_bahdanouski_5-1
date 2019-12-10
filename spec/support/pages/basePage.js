const logger = require('./../helpers/logger')

function BasePage() {
	this.clickElement = async (selector) => {
		const element = await $(selector)
		await element.click()
	}

	this.selectorByResource = (resourceId) => {
		logger.debug('DEBUG ----> BasePage -> selectorByResource')
		logger.debug(`DEBUG ----> resourceId: ${resourceId}`)
		return `android=new UiSelector().resourceId("${resourceId}")`
	}

	this.selectorByText = (text) => {
		logger.debug('DEBUG ----> LoginPage -> selectorByText')
		logger.debug(`DEBUG ----> text: ${text}`)
		return `android=new UiSelector().className("android.widget.TextView").textContains("${text}")`
	}
}

module.exports = BasePage
