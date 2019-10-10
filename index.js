#!/usr/bin/env node

const download = require('download-git-repo')
const inquirer = require('inquirer')
const ora = require('ora')
const chalk = require('chalk')
const commander = require('commander')


const program = new commander.Command('segi-cli')
const spinner = ora('开始下载')
spinner.start()

program
  .version('v1.0', '-v, --version')
  .arguments('<projectName>')
  .alias('cp')
  .description('segi-web-cli ')
  .action((index, name) => {
    console.log('action')   
  })

download('direct:https://github.com/lronelove/single-page-dec-cli.git', 'hello', { clone: true }, (err) => {
  if (err) {
    console.log(chalk.red(err))
  } else {
    console.log(chalk.green('下载成功!'))
  }
})
spinner.stop()  

program.parse(process.argv)






