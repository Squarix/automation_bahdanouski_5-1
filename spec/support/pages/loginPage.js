const BasePage = require('./basePage')
const logger = require('./../helpers/logger')

const loginResourceId = 'user_username'
const passResourceId = 'user_password'

function LoginPage() {
	BasePage.apply(this, arguments)

	this._errorResource = this.selectorByResource('error')
	this._submitResource = this.selectorByResource('submit')

	this.setPassword = async (pass) => {
		logger.debug('DEBUG ----> LoginPage -> setPassword')
		logger.debug(`DEBUG ----> pass is ${pass}`)
		const password = await $(this.selectorByResource(passResourceId))
		await password.setValue(pass)
	}

	this.setLogin = async (login) => {
		logger.debug('DEBUG ----> LoginPage -> setLogin')
		logger.debug(`DEBUG ----> login is ${login}`)
		const loginField = await $(this.selectorByResource(loginResourceId))
		await loginField.setValue(login)
	}

	this.clickSubmit = async () => {
		await this.clickElement(this._submitResource)
	}

	this.getError = async () => {
		logger.debug('DEBUG ----> LoginPage -> getting error message');
		const errorElement = await $(this._errorResource);
		const error = await errorElement.getText();

		return error
	}


}

LoginPage.prototype = BasePage

module.exports = LoginPage

