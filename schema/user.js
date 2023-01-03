const joi = require('joi')
/**
 * string() 值必须是字符串
 * alphanum() 值只能是包含 a-zA-Z0-9 的字符串
 * min(length) 最小长度
 * max(length) 最大长度
 * required() 值是必填项，不能为 undefined
 * pattern(正则表达式) 值必须符合正则表达式的规则
 */

// 手机号的验证规则
const account = joi
    .string()
    .length(11)
    .pattern(/^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/)
    .required()
// 密码的验证规则
const password = joi
    .string()
    .alphanum()
    .pattern(/^[\S]{6,12}$/)
    .required()
// 昵称的验证规则
const name = joi
    .string()
    .min(1)
    .max(8)
    .required()

const nickname = joi
    .string()
    .required()

const gender = joi
    .string()
    .required()

const role = joi
    .string()
    .required()

const cid = joi
    .number()
    .required()

// 注册和登录表单的验证规则对象
exports.reg_schema = {
    // 表示需要对 req.body 中的数据进行验证
    body: {
        account,
        password,
        name,
        nickname,
        gender,
        cid
    },
}

exports.log_schema = {
    body: {
        account,
        password
    }
}