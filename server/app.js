var express = require('express')
var path = require('path')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var axios = require('axios')
var app = express()

// 跨域设置
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

const doRequest = (options, req, res, next) => {
  options.params = options.params || {}
  if (req.body && req.body.body) {
    options.data = Object.assign(options.params, JSON.parse(req.body.body))
  } else {
    Object.assign(options.params, req.query)
  }
  axios(options)
    .then(data => res.json(Object.assign(data.data, {return_code: 0, return_info: 'ok'})))
    .catch(e => res.json({return_code: 1000, return_info: 'server error'}))
}


//模拟 get 请求
app.use('/api/place/suggestion', express.Router().get('/', doRequest.bind(null, {
  method: 'get',
  url: 'http://api.map.baidu.com/place/v2/suggestion',
  params: {ak: 'HRGVIZaERPQqrudUwFwzMPRy', output: 'json', region: '全国'},
})))

//模拟 post 请求
app.use('/api/direction/transit', express.Router().get('/', doRequest.bind(null, {
  method: 'get',
  url: 'http://api.map.baidu.com/direction/v2/transit',
  params: {ak: 'HRGVIZaERPQqrudUwFwzMPRy'},
})))

//模拟 post 请求
app.use('/api/joke/rand', express.Router().post('/', doRequest.bind(null, {
  method: 'post',
  url: 'http://v.juhe.cn/joke/randJoke.php',
  params: {key: '0d4818dd0829e4a5ff44ae3e31db9153'},
})))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
