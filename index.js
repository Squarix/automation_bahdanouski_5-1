const { Builder, By, Key, until } = require('selenium-webdriver');


(async () => {
	const driver = new Builder()
		.forBrowser('firefox')
		.build();
	await driver.get('https://www.onliner.by/');

	const elementsByClass = await driver.findElements(By.className('b-currency__compact-2'));
	console.log(elementsByClass.length);
	console.log(await elementsByClass[0].getAttribute('href'));

	const elementsById = await driver.findElements(By.id('cart-mobile'));
	console.log(elementsById.length);
	console.log(await elementsById[0].getAttribute('className'));

	const elementsByName = await driver.findElements(By.name('query'));
	console.log(elementsByName.length);
	console.log(await elementsByName[0].getAttribute('placeholder'));

	const elementsByTagName = await driver.findElements(By.tagName('strong.title'));
	console.log(elementsByTagName.length);
	console.log(await elementsByTagName[0].getText());

	const elementsByLinkText = await driver.findElements(By.linkText('Смартфоны'));
	console.log(elementsByLinkText.length);
	console.log(await elementsByLinkText[0].getAttribute('href'));

	const elementsByPLinkText = await driver.findElements(By.partialLinkText('гарнитуры'));
	console.log(elementsByPLinkText.length);
	console.log(await elementsByPLinkText[0].getAttribute('href'));

	const elementsByCss = await driver.findElements(By.css('.b-ba-layer div.btn-group a.btn-yellow.item'));
	console.log(elementsByCss.length);
	console.log(await elementsByCss[0].getText());


	await driver.quit();


	// .//table/tbody/tr[position() = count(//td/a[.='SimpleDataset']/parent::*/preceding-sibling::*)+1]/td[position() = count(//th[@data-title="Rows"]/preceding-sibling::*)+1]
})();

