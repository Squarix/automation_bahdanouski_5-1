const readline = require('readline-promise').default;
const path = require('path');
const fs = require('fs');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});


run = async () => {
	let dirPath = await rl.questionAsync(`Dir path -->`);
	if (dirPath == 0)
		dirPath = path.join(__dirname, '');

	console.log(dirPath);

	let extension = await rl.questionAsync(`Extension -->`);
	if (extension == 0)
		extension = '.txt';

	const files = await getFiles(dirPath, extension);
	if (files.length === 0)
		throw 'Files not found';
	let result = await sortByDate(files);

	const firstFile = result[0];

	console.log(`Newest file - ${firstFile.filename}`);
	console.log(`Date - ${firstFile.stat.birthtime }`);

	result.shift();

	const otherEntries = await filterBySeconds(result, firstFile);
	console.log('10 seconds range: ');
	otherEntries.map(entry => {
		console.log(entry.filename + ' - ' + entry.stat.birthtime);
	});

	process.exit(0);
};


const getFiles = async(dirPath, extension) => {
	const dirEntries = await fs.promises.readdir(dirPath);
	const files = dirEntries.filter(file => {
		return path.extname(file) === extension;
	});

	const fileStats = await getFilesStat(files, dirPath);
	const fileInfo = [];

	files.map((file, index) => {
		fileInfo.push({ stat: fileStats[index], filename: file });
	});

	return fileInfo;
};

const filterBySeconds = async (files, entry) => {
	return files.filter((file) => {
		const difference = entry.stat.birthtime.getTime() - file.stat.birthtime.getTime();
		const difInSeconds = difference / 1000;
		return difInSeconds < 10;
	});
};

const sortByDate = async (files) => {
	return files.sort((file1, file2) => {
		return file2.stat.birthtime - file1.stat.birthtime;
	});
};

const getFilesStat = async (files, dirPath) => {
	return await Promise.all(
		files.map(async (file) => {
			return await fs.promises.stat(path.join(dirPath, file));
		})
	)
};

run();
