#!/usr/bin/env node

const download = require('download-git-repo')
const ora = require('ora')
const commander = require('commander')

const program = new commander.Command('segi-cli')

// promice格式的下载
function promiseDownload(projectName) {
  const spinner = ora('开始下载')
  spinner.start()

  return new Promise((resolve, reject) => {
    download('direct:https://github.com/lronelove/single-page-dec-cli.git', projectName, { clone: false }, (err) => {
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
  .version('v1.0', '-v, --version')
  .arguments('<projectName>')
  .alias('cp')
  .description('segi-web-cli')
  .action((name) => {
    let projectName = name || 'web'
    promiseDownload(projectName).catch(err => {
      if (err) {
        console.log('下载失败:', err)
      }
    })
  })
program.parse(process.argv)






