const download = require('download-git-repo')
const ora = require('ora')
const chalk = require('chalk')
const inquirer = require('inquirer')

// 资源配置
const resources = {
	'html': 'direct:https://github.com/lronelove/single-page-dec-cli.git',
	'web': 'direct:http://wangzhe@gitlab.uhomecp.com:9200/web-public/segi-ant.git'
}

// 基础选项配置
const baseOption = {
	appType: 'html'
}

// promice格式的下载
function promiseDownload(projectName, gitUrl) {
	const spinner = ora('开始下载')
	spinner.start()

	return new Promise((resolve, reject) => {
		download(gitUrl, projectName, { clone: true }, (err) => {
			if (err) {
				spinner.fail('下载失败！')
				reject(err)
			} else {
				spinner.succeed('下载完成！')
				resolve(true)
			}
			spinner.stop()
		})
	})
}

async function createApp(projectName) {
	let result = await inquirer.prompt([
		{
			type:'list',
			name:'appType',
			message:'select application type that you want to use',
			choices:[
				'html',
				'web'
			],
			default: 'html'
		}
	]).then(answer => {
		baseOption.appType = answer.appType
	})

	let fileName = projectName || 'web'

	if (baseOption.appType === 'html') {
		promiseDownload(fileName, resources.html).catch(err => {
			if (err) {
				console.log(chalk.red('下载失败:'), err)
			}
		})
	} else {
		let res = await inquirer.prompt([ {
			type: 'input',
			name: 'companyName',
			message: 'what is your company ?',
			default: ''
		}]).then((answer) => {
			if (answer.companyName === 'segi' || answer.companyName === '四格互联') {
				console.log(chalk.green('welcome to use'))
				promiseDownload(fileName, resources.web).catch(err => {
					if (err) {
						console.log(chalk.red('下载失败:'), err)
					}
				})
			} else {
				console.log(chalk.yellow('we are so sorry, you don not have the right to use'))
			}
		})
	}
}


module.exports = createApp