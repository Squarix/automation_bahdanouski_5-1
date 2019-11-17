const {until} = require('selenium-webdriver')

module.exports.quitDriver = async (driver) => {
	await driver.quit();
};

module.exports.timeout = (ms) => {
	return new Promise(resolve => setTimeout(resolve, ms));
};

module.exports.getElements = async (driver, locator) => {
	const elements = await driver.wait(until.elementsLocated(locator));
	return elements
};

module.exports.getElement = async (driver, locator) => {
	const element = await driver.wait(until.elementLocated(locator));
	return element
};
