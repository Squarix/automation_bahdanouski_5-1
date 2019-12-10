const BasePage = require('./basePage')
const logger = require('./../helpers/logger')

function WelcomePage() {
	BasePage.apply(this, arguments)

	this._loginButton = this.selectorByText('Login');

	this.clickLogin = async () => {
		await this.clickElement(this._loginButton)
	}

}

WelcomePage.prototype = BasePage

module.exports = WelcomePage
