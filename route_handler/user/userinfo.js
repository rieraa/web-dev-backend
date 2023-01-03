const db = require('../../db/index')

exports.getUserInfo = (req, res) => {
    const account = req.auth.account
    const role = req.auth.role
    if (role === '2') find_sql =
        `select student.name name,student.sid sid,student.nickname nickname,student.gender gender,student.account account,cname,role ` +
        `from user join student on user.account = student.account join class on student.cid = class.cid where user.account = ? `
    else find_sql = `select * from user join teacher t on user.account = t.account where user.account = ?`
    db.query(find_sql, [account], function (err, results) {
        // 1. 执行 SQL 语句失败
        if (err) return res.cc(err)

        // 2. 执行 SQL 语句成功，但是查询到的数据条数不等于 1
        if (results.length !== 1) return res.cc('获取用户信息失败！')
        // 3. 将用户信息响应给客户端
        res.send({
            status: 0,
            message: '获取用户基本信息成功！',
            data: results[0],
        })
    })
}

//该逻辑转移至edit
// exports.updateUserInfo = (req, res) => {
//     const account = req.auth.account

// }