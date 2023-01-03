var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

const cors = require('cors')
const Joi = require('joi')

// Token中间键配置 
const config = require('./config') //导入配置文件
const { expressjwt: jwt } = require('express-jwt') // 解析 token 的中间件

// Router
const usersRouter = require('./routes/user/users')
const userinfoRouter = require('./routes/user/userinfo')
const codeRouter = require('./routes/student/code')
const codelistRouter = require('./routes/student/codelist')
const detailRouter = require('./routes/student/detail')
const editInfoRouter= require('./routes/student/editInfo')
const classRouter=require('./routes/teacher/class')
// const classRouter=require('./routes/teacher/class')
const questionRouter=require('./routes/teacher/question')
const classlistRouter = require('./routes/class/classlist')
const finishlistRouter = require('./routes/teacher/finishlist')
const studentfinishRouter = require('./routes/teacher/studentfinish')
const reviewRouter = require('./routes/teacher/recordreview')
const commentRouter=require('./routes/teacher/teachercomment')
//const recordsRouter=require('./routes/teacher/records')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

// CORS解决同源协议必须在路由前进行注册
app.use(cors())
// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
app.use(jwt({ secret: config.jwtSecretKey, algorithms: ["HS256"] }).unless({ path: [/^\/api\//] }))
app.use(logger('dev'))
app.use(express.json())
// 配置解析表单数据的中间件
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(function (req, res, next) {
  // status = 0 为成功； status = 1 为失败； 默认将 status 的值设置为 1，方便处理失败的情况
  res.cc = function (err, status = 1) {
    res.send({
      // 状态
      status,
      // 状态描述，判断 err 是 错误对象 还是 字符串
      message: err instanceof Error ? err.message : err,
    })
  }
  next()
})

app.use('/api', usersRouter)
// 注意：以 /my 开头的接口，都是有权限的接口，需要进行 Token 身份认证
app.use('/user', userinfoRouter)
app.use('/student', codeRouter)
app.use('/student', codelistRouter)
app.use('/student', detailRouter)
app.use('/student',editInfoRouter)
// app.use('/records',classRouter)
app.use('/teacher',questionRouter)
app.use('/api',classlistRouter)
app.use('/teacher',finishlistRouter)
app.use('/teacher',studentfinishRouter)
app.use('/teacher',reviewRouter)
app.use('/teacher',classRouter)
app.use('/teacher',commentRouter)
//app.use('/api',recordsRouter)


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// 错误中间件
app.use(function (err, req, res, next) {
  // 4.1 Joi 参数校验失败
  if (err instanceof Joi.ValidationError) {
    return res.send({
      status: 1,
      message: err.message
    })
  }

  // 捕获身份认证失败的错误
  if (err.name === 'UnauthorizedError')
    return res.send({
      status: 1,
      message: '身份验证失败'
    })

  // 4.2 未知错误
  res.send({
    status: 1,
    message: err.message
  })

})

module.exports = app
