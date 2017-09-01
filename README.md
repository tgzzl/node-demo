node服务

1、web框架express搭建，使用request作为http-clien库

2、前端用vue+vue-router+axios搭建

注意请修改 client/my-project/src/config/env.js 文件，把后台服务host替换成你的后台host

```javascript
let endpoint = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : document.location.origin;
let endpoint = process.env.NODE_ENV === 'development' ? 'http://yourhost:3000' : document.location.origin;
```
    
如何起后台服务（默认端口3000）
```bash
cd server
npm install
npm start
```

如何起前端服务（默认端口8080）
```bash
cd client/my-project
npm install sass-loader node-sass --save-dev
npm install
npm run dev
```
