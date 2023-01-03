const db = require('../../db/index.js')
const bcrypt = require('bcryptjs')//密码加密
const jwt = require('jsonwebtoken')//token
const config = require('../../config')

// 统一检测账号的sql
const check_sql = `select * from user where account=?`

exports.regist = (req, res) => {
    // 接收表单数据
    const userinfo = req.body
    console.log(userinfo)
    db.query(check_sql, [userinfo.account], function (err, results) {
        // 执行 SQL 语句失败
        if (err) {
            return res.cc(err)
            // res.send({ status: 1, message: err.message })
        }
        // 用户名被占用
        else if (results.length > 0) {
            return res.cc('该账号已被注册！')
            //res.send({ status: 1, message: '用户名被占用，请更换其他用户名！' })
        }
    })
    //加密密码并插入数据
    userinfo.password = bcrypt.hashSync(userinfo.password, 5)
    const insert_sql = `insert into user set ?`
    const insert_sql2 = `insert into student set ?`
    const insert_set = { account: userinfo.account, password: userinfo.password, role: 2 }
    const insert_set2 = { name: userinfo.name, cid: userinfo.cid, nickname: userinfo.nickname, gender: userinfo.gender, account: userinfo.account }
    console.log(userinfo)
    db.query(insert_sql, [insert_set],
        function (err, results) {
            // 执行 SQL 语句失败
            if (err) return res.cc(err)
            // SQL 语句执行成功，但影响行数不为 1
            else if (results.affectedRows !== 1) {
                return res.cc('注册用户失败，请稍后再试！')
            }
            // 注册成功
            db.query(insert_sql2, [insert_set2],
                function (err, results) {
                    // 执行 SQL 语句失败
                    if (err) return res.cc(err)
                    // SQL 语句执行成功，但影响行数不为 1
                    if (results.affectedRows !== 1) {
                        return res.cc('注册用户失败，请稍后再试！')
                    }
                    // 注册成功
                    res.send({ status: 0, message: '注册成功！' })
                })
        })
}

exports.login = (req, res) => {
    const userinfo = req.body
    db.query(check_sql, [userinfo.account], function (err, results) {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)

        // 执行 SQL 语句成功，但是查询到数据条数不等于 1
        if (results.length !== 1) return res.cc('登录失败！')

        // 拿着用户输入的密码,和数据库中存储的密码进行对比
        const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)

        // 如果对比的结果等于 false, 则证明用户输入的密码错误
        if (!compareResult) {
            return res.cc('密码错误！')
        }
        console.log(results[0])
        // 剔除敏感信息
        const user = { ...results[0], password: '', user_pic: '', username: '', id: '' }
        console.log(user)
        // 注册token
        const tokenStr = jwt.sign(user, config.jwtSecretKey, {
            expiresIn: '10h', // token 有效期为 10 个小时
        })

        res.send({
            status: 0,
            message: '登录成功！',
            // 为了方便客户端使用 Token，在服务器端直接拼接上 Bearer 的前缀
            token: 'Bearer ' + tokenStr,
        })

    })
}

