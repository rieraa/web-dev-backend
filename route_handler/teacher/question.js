const { now } = require('mongoose')
const db = require('../../db/index.js')
const time = require('../../utils/nowDate.js')

exports.add = (req, res) => {
    const { pbContent, pbName } = req.body
    const addproblem = `insert into problem (pbContent,pbName,createTime) values (?,?,now())`
    // values (?,?,?,?,null,1,' ')

    db.query(addproblem, [pbContent, pbName], function (err, results) {
        if (err) {
            return res.cc(err)
        }
        else {
            res.send({
                status: 0,
                message: '添加成功',
                data: results
            })
        }
    })
}
exports.list = (req, res) => {
    const find_list = 'select p.pid,p.pbContent,p.pbName ,group_concat(distinct pl.cid) as cids from problem p left join problemlist pl on p.pid=pl.pid group by p.pid,p.pbContent,p.pbName'
    db.query(find_list, function (err, results) {
        if (err) {
            return res.cc(err)
        }
        else {
            res.send({
                status: 0,
                message: '查询成功',
                data: results
            })
        }
    })
}
// 已有题目，选中班级进行发布
exports.publish = (req, res) => {
    // console.log("xxxx",req.body)
    const { pid, cid, endTime, mustdo } = req.body
    const publish_problem = 'insert into problemlist values(?,?,date_format(now(),"%Y-%m-%d %H:%I:%s"),?,?)'
    db.query(publish_problem, [pid, cid, endTime, mustdo], function (err, results) {
        if (err) {
            return res.cc(err)
        }
        else {
            res.send({
                status: 0,
                message: '发布成功',
            })
        }
    })

}

exports.delete = (req, res) => {
    const pid = req.body.pid
    const delete_problem = 'delete from problem where pid=?'
    db.query(delete_problem, pid, function (err, results) {
        if (err) {
            return res.cc(err)
        }
        else {
            res.send({
                status: 0,
                message: '删除成功',
            })
        }
    })
}

exports.deleteQuestion = (req, res) => {
    const { cid, pid } = req.body
    const deleteQuestion_sql = `delete from problemlist where pid = ? and cid = ?`
    db.query(deleteQuestion_sql, [pid, cid], (err, results) => {
        if (err) {
            return res.cc(err)
        }
        else {
            res.send({
                status: 0,
                message: '删除权限成功'
            })
        }
    })
}