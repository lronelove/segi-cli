#!/usr/bin/env node

const download = require('download-git-repo')
const ora = require('ora')
const commander = require('commander')

const packageConfig = require('./package')
const program = new commander.Command('segi-cli')

// promice格式的下载
function promiseDownload(projectName) {
  const spinner = ora('开始下载')
  spinner.start()

  return new Promise((resolve, reject) => {
    download('direct:https://github.com/lronelove/single-page-dec-cli.git', projectName, { clone: true }, (err) => {
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

program
  .version('v' + packageConfig.version, '-v, --version')
  .description(packageConfig.desciption)
  .option('-d, --detail', '', 'a tool to resolve crossing origin')
  .action((actionName, projectName) => {
    if (actionName === 'create') {
      let fileName = projectName || 'web'
      promiseDownload(fileName).catch(err => {
        if (err) {
          console.log('下载失败:', err)
        }
      })
    }
  })
program.parse(process.argv)

if (program.detail) {
  console.log(`${program.detail}`)
}







