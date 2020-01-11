#!/usr/bin/env node

const commander = require('commander')
const chalk = require('chalk')

const packageConfig = require('./package')
const program = new commander.Command('segi-cli')

const createApp = require('./src/create')

program
  .version('v' + packageConfig.version, '-v, --version')
  .description(packageConfig.desciption)
  .option('-d, --detail', '', 'a tool to resolve crossing origin')
  .action(async (actionName, projectName) => {
    if (actionName === 'create') {
	    createApp()
    }
  })
program.parse(process.argv)

if (program.detail) {
  console.log(chalk.blue(`${program.detail}`))
}







