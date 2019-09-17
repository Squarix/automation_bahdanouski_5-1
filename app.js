const path = require('path');
const fs 	 = require('fs');

// callback
let filePath = path.join(__dirname, 'a.txt');
console.log(1);
fs.readFile(filePath, 'utf-8', (err, content) => {
	if (err)
		console.error(err);
	else {
		console.log('Async read file --> callback');
		console.log(content);
		console.log('----------------------------')
	}
});

// promise
console.log(2);

fs.promises.readFile(filePath, { encoding: 'utf-8' })
	.then(content => {
		console.log('Async read file --> Promise -> Then');
		console.log(content);
		console.log('---------------------------')
	})
	.catch(err => {
		console.log('Async read file --> Promise -> Catch');
		console.error(err);
		console.log('------------------------------------');
	});

// async await

console.log(3);
readFileAsync()
	.catch(err => {
			console.log('Async read file --> Async/Await -> Catch');
			console.error(err);
			console.log('----------------------------------------');
	});

async function readFileAsync() {   // Return promise<void>
	let content = await fs.promises.readFile(filePath, { encoding: 'utf-8' });
	console.log('Async read file --> Async/Await');
	console.log(content);
	console.log('-------------------------------');
}

// callback + promise
console.log(4);

fs.readFile(filePath, 'utf-8', (err, content) => {
	if (err)
		console.error(err);
	else {
		console.log('Async read file --> callback+promise');
		console.log(content);
		console.log('----------------------------')

		fs.promises.readFile(filePath, { encoding: 'utf-8' })
			.then(content => {
				console.log('Async read file --> callback + promise -> Promise -> Then');
				console.log(content);
				console.log('----------------------------------------------')
			})
			.catch(err => {
				console.log('Async read file --> callback + promise -> Promise -> Catch');
				console.error(err);
				console.log('-----------------------------------------------');
			});

	}
});


// promise + await

fs.promises.readFile(filePath, { encoding: 'utf-8' })
	.then(async (content) => {
		console.log('Async read file --> Promise + Await -> Then');
		console.log(content);
		console.log('---------------------------')

		let fileContent = await fs.promises.readFile(filePath, { encoding: 'utf-8' });
		console.log('Async read file --> Promise + Await -> Await');
		console.log(fileContent);
		console.log('-------------------------------');

	})
	.catch(err => {
		console.log('Async read file --> Promise + Await -> Catch');
		console.error(err);
		console.log('------------------------------------');
	});
