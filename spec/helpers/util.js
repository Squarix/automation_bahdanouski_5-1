module.exports.quitDriver = async (driver) => {
	await driver.quit();
};

module.exports.timeout = (ms) => {
	return new Promise(resolve => setTimeout(resolve, ms));
};

module.exports.getElements = async (driver, locator) => {
	const elements = await driver.findElements(locator);
	return elements
};

module.exports.getElement = async (driver, locator) => {
	const element = await driver.findElement(locator);
	return element
};
