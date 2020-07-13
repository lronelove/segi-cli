# a tool to create a project which aims at resolving cross-domain access questions when we work with .html files 
 
## installation
```javascript
npm i segi-cli -g
```

## usage
```javascript
segi-cli create projectName
```
1. segi-cli create + the name of the project
2. then you can choose which template that you need.

## template type
these are types of project template
1. html: .html file project
2. web: vue3.0 web project template
3. mobile: h5 project template
4. mobileTs: h5 project template which uses typescript
5. webTs:  vue3.0 web project template which uses typescript
6. miniProgram: mini-program for weChat project template which uses typescript

## html template introduction
1. catalogue
![Image text](https://raw.githubusercontent.com/lronelove/segi-cli/master/images/catalogue.png)
this is the catalogue of the project, in fact, it works with [webpack](http://webpack.github.io/).
there is the usage of these file:  
/static: you can put some resources here  
/src: no use now  
index.html: this a example which can resolve cross-domain access  
server.js: this a node server which can create a server listening at 3000  
webpack.config.js: this is a configuration of [webpack](http://webpack.github.io/), you can change it to satisfy your need  
webpack.dev.js: there is the content of the file
login.html: this is a example to test multiple pages application, you can just config multiple pages application in 'multiplePagesConfig', It is a Array, you can config by your own pages.
```javascript
const merge = require('webpack-merge')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const common = require('./webpack.config.js')

const host = '192.168.21.202'

// 多页面配置(可以在这里配置多个页面)
const multiplePagesConfig = [
	{
		filename: 'index.html',
		template: './index.html'
	},
	{
		filename: 'login.html',
		template: './login.html'
	}
]

// 根据多页面配置生成HtmlWebpackPlugin配置
function generatePluginConfig () {
	return multiplePagesConfig.map(item => {
		return new HtmlWebpackPlugin({
			// 生成出来的html文件名
			filename: item.filename,
			// 每个html的模版，这里多个页面使用同一个模版
			template: item.template,
			// 自动将引用插入html
			inject: true
		})
	})
}

module.exports = merge(common, {
  mode: 'development',
  entry: {
    app: './src/index.js'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    public: 'http://' + host + ':8083',
    host: host,
    port: '8083',
    publicPath: '/',
    hot: true,
    proxy: {
      '/test': {
        target: 'http://127.0.0.1:3000'
      }
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([
      { from: 'static/js/*' },
      { from: 'static/css/*' },
      { from: 'static/font/*' },
      { from: 'static/imgs/*' }
    ]),
	  ...generatePluginConfig() // 根据多页面配置生成HtmlWebpackPlugin配置
  ]
});

```  
You should change the 'host' with your IP. Now we can see the 'proxy' option, this is just a example which runs with the node server.
you can use
 ```javascript 
node server.js  
```
or
 ```javascript 
npm run serve 
```
to start the node server.
you can also change the proxy option as you want.

## epilogue
This project is so simple which just aims at resolving cross-domain access problems, but you can change the webpack config to fit your project.
Thank you~


