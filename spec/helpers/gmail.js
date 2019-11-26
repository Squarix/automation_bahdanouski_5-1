const fs = require('fs').promises;

const {google} = require('googleapis');

const base64 = require('js-base64').Base64;
const logger = require('./../helpers/logger');
const readline = require('readline');

const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
const CREDENTIALS_PATH = 'credentials3.json';
const TOKEN_PATH = 'token.json';

let countMessages = 0;

module.exports.authorize = async function () {
	const credentials = await fs.readFile(CREDENTIALS_PATH);
	const {client_secret, client_id, redirect_uris} = JSON.parse(credentials).installed;
	let oAuth2Client = new google.auth.OAuth2(
		client_id, client_secret, redirect_uris[0]);

	oAuth2Client = await getNewToken(oAuth2Client);
	//let token = await fs.readFile(TOKEN_PATH);
	//oAuth2Client.setCredentials(JSON.parse(token.toString()));
	return oAuth2Client;
};

module.exports.processMessages = async function (client) {
	const messages = await getMessages(client);
	for (let {id} of messages.data.messages) {
		await processMessage(id, client);
	}
};

module.exports.countMessages = async function (client) {
	const messages = await getMessages(client);
	return messages.length;
};

async function getMessages(client) {
	logger.debug(`Start getting messages`);
	const gmail = google.gmail({version: 'v1', client});
	let messages = await gmail.users.messages.list({userId: 'me'});
	logger.debug(messages.data);
	logger.debug(`End getting messages`);
	return messages;
}

async function processMessage(id, auth) {
	logger.debug('Started proccesing message');
	const gmail = google.gmail({version: 'v1', auth});

	let messageData = await gmail.users.messages.get({
		userId: 'me',
		id: id
	});

	let messageSubject = getSubject(messageData);
	logger.debug(messageSubject);

	if (messageSubject.includes('Automation')) {
		logger.debug('Subject appropriate');
		countMessages++;
		logger.info(`Subject: ${messageSubject}. \nBody:\n${getBody(messageData)}`);
	} else {
		logger.warn('Subject is inappropriate');
	}
	logger.debug('End process message');
}

async function getNewToken(oAuth2Client) {
	return new Promise(resolve => {
		const authUrl = oAuth2Client.generateAuthUrl({
			access_type: 'offline',
			scope: SCOPES,
		});
		console.log('Authorize this app by visiting this url:', authUrl);
		const rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout,
		});
		rl.question('Enter the code from that page here: ', (code) => {
			rl.close();
			oAuth2Client.getToken(code, async (err, token) => {
				if (err) return console.error('Error retrieving access token', err);
				oAuth2Client.setCredentials(token);
				// Store the token to disk for later program executions
				await fs.writeFile(TOKEN_PATH, JSON.stringify(token));
				resolve(oAuth2Client)
			});
		});
	})
}

function getSubject(messageData) {
	for (const {name, value} of messageData.data.payload.headers) {
		if (name === 'Subject') {
			return value;
		}
	}
}

function getBody(messageData) {
	let messageBody = '';
	for (const {body} of messageData.data.payload.parts) {
		if (body.data) {
			messageBody += base64.decode(body.data.replace(/-/g, '+').replace(/_/g, '/'));
		}
	}
	return messageBody;
}

