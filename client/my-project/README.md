# my-project

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test

找不到命令vue，如何解决
1.查看node安装目录 例如：~/.nvm/versions/node/v8.3.0/lib/node_modules
npm root -g 
2.打开并编辑 ~/.profile 文件
在文件末尾添加 vue-cli 的安装环境
例如：export PATH="$PATH:$HOME/.nvm/versions/node/v8.3.0/lib/node_modules/vue-cli/bin"
vim export PATH="$PATH:$HOME/.nvm/versions/node/v8.3.0/lib/node_modules/vue-cli/bin"
3.加载环境变量
source ~/.profile

不能使用sass or less css预处理器，如何解决
npm install sass-loader node-sass --save-dev
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
