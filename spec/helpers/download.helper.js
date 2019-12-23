const path = require('path')
const config = require('../config')
const fs = require('fs').promises


class DownloadHelper {
	constructor() {
		this.downloadDir = config.downloadDir
	}

	async isDownloading() {
		const files = await fs.readdir(this.downloadDir)
		for (const file of files) {
			if (
				file.includes('.crdownload') &&
				new Date() - fs.stat(path.join(this.downloadDir, file)).birthtimeMs <= config.downloadTimeout
			) {
				return true
			}
		}

		return false
	}

	async isDownloaded(fileName) {
		const files = await fs.readdir(this.downloadDir)

		for (const file of files) {
			if ( file.includes(fileName) &&
				(new Date() - (await fs.stat(path.join(this.downloadDir, file))).birthtimeMs)
			) {
				return true
			}
		}

		return false
	}
}

module.exports = DownloadHelper
