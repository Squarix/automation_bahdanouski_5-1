const gmailApi = require('./helpers/gmail');
const logger = require('./helpers/logger');
const config = require('./config');

const AllureReporter = require('jasmine-allure-reporter');

jasmine.DEFAULT_TIMEOUT_INTERVAL = config.timeout;
jasmine.getEnv().addReporter(new AllureReporter({
	resultsDir: 'allure'
}));


describe('gmail api', () => {
	beforeAll(async () => {
		this.client = await gmailApi.authorize()
	});

	it('Receive messages', async () => {
		logger.debug(`Receiving messages data`);
		await gmailApi.processMessages(this.client);
		logger.debug(`End receiving`);
	});

	it('Check messages amount', async () => {
		logger.debug(`it check messages amount`);
		const messagesAmount = await gmailApi.countMessages(this.client);
		expect(messagesAmount).toBe(config.messages);
		logger.debug(`end check messages amount`);
	});
});
