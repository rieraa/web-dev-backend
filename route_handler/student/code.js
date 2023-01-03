const db = require('../../db/index.js')
let { PythonShell } = require('python-shell')
const e = require('express')

exports.code = (req, res) => {
    const codeinfo = req.body.content
    PythonShell.runString(codeinfo, null, function (err, output) {
        if (err) {
            console.log("output", output)
            res.cc(err)
        }
        else {
            res.send({
                status: 0,
                message: '运行成功！',
                result: output
            })
        }
    })
}

exports.submitcode = (req, res) => {
    console.log(req.body)
    const { content, pid } = req.body
    //从token中获取账号
    const account = req.auth.account

    const submitinfo = "update recordlist SET content=?,state=2 where pid=? and sid=?"
    const find_sid = "select sid from student where account =?"

    db.query(find_sid, [account], (err, results1) => {
        if (err) {
            res.cc(err)
        }
        else {
            const sid = results1[0].sid
            db.query(submitinfo, [content, pid, sid], function (err, results) {
                if (err) {
                    return res.cc(err)
                }
                else (
                    res.send({
                        status: 0,
                        message: '提交成功',
                        data: results
                    })
                )
            })
        }
    })


}

