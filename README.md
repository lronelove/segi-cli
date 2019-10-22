# a tool to create a project which aims at resolving cross-domain access questions when we work with .html files 
 
## installation
```javascript
npm i segi-cli -g
```

## usage
```javascript
segi-cli projectName
```
segi-cli + the name of the project

## introduction
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
```javascript
const merge = require('webpack-merge');
const common = require('./webpack.config.js');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const host = '192.168.5.51'

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
    ])
  ]
});
```  
You should change the 'host' with your IP. Now we can see the 'proxy' option, this is just a example which runs with the node server.
you can use
 ```javascript 
node server.js  
```
to start the node server.
you can also change the proxy option as you want.

## epilogue
This project is so simple which just aims at resolving cross-domain access problems, but you can change the webpack config to fit your project.
Thank you~


