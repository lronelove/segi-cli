#!/usr/bin/env node

const commander = require('commander')
const chalk = require('chalk')

const packageConfig = require('./package')
const program = new commander.Command('segi-cli')

const createApp = require('./src/commands/create')

program
  .version('v' + packageConfig.version, '-v, --version')
  .description(packageConfig.desciption)
  .option('-d, --detail', '', 'a tool to download template depend on what you want')
  .action(async (actionName, projectName) => {
    if (actionName === 'create') {
	    createApp(projectName)
    }
  })
program.parse(process.argv)

if (program.detail) {
  console.log(chalk.blue(`${program.detail}`))
}







