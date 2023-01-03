const express = require('express')
const router = express.Router()
const userHandler = require('../../route_handler/user/user')
// 1. 导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi')
// 2. 导入需要的验证规则对象
const { reg_schema, log_schema } = require('../../schema/user')

router.post('/register', expressJoi(reg_schema), userHandler.regist)

router.post('/login', expressJoi(log_schema), userHandler.login)

module.exports = router
