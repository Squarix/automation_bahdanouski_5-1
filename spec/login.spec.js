const WelcomePage = require('./support/pages/welcomePage')
const LoginPage = require('./support/pages/loginPage')

const logger = require('./support/helpers/logger')
const config = require('./support/config')

const welcomePage = new WelcomePage()
const loginPage = new LoginPage()


describe('Testing application login', () => {
	it ('must return error', async () => {
		logger.debug('TEST ----> Clicking login button')
		await welcomePage.clickLogin()

		logger.debug('TEST ----> Filling login')
		await loginPage.setLogin(config.login)

		logger.debug('TEST ----> Filling password')
		await loginPage.setPassword(config.password)

		logger.debug('TEST ----> Clicking submit button')
		await loginPage.clickSubmit()

		logger.debug('TEST ----> Getting error')
		expect(await loginPage.getError()).toContain('We didn\'t recognize the username or password you entered. Please try again.')
	})
})
