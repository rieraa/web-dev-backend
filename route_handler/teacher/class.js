const db = require('../../db/index.js')
exports.list = (req, res) => {
    console.log(req.body.search)
    const search = '%' + req.body.search + '%'
    const get_list = "select c.cid,c.cname,count(sid) as count from student s right join class c on s.cid=c.cid where c.cname like ? group by c.cid,c.cname "
    db.query(get_list, [search], function (err, results) {
        if (err) {
            return res.cc(err)
        }
        else (
            res.send({
                status: 0,
                message: '查询成功',
                data: results
            })
        )
    })
}

exports.delete = (req, res) => {
    const cid = req.body.cid
    const delete_class = "delete from class where cid=?"
    // console.log(req.body)
    db.query(delete_class, [cid], function (err, results) {
        if (err) {
            return res.cc(err)
        }
        else (
            res.send({
                status: 0,
                message: "删除成功",
                data: results
            })
        )
    })
}

exports.add = (req, res) => {
    const cname = req.body.cname
    const add_class = "insert into class (tid,cname) values (1,?)"
    db.query(add_class, [cname], function (err, results) {
        if (err) {
            return res.cc(err)
        }
        else (
            res.send({
                status: 0,
                message: "添加班级成功",
                data: results
            })
        )
    })
}
exports.classinfo = (req, res) => {
    const cid = req.body.cid
    const search = '%' + req.body.search + '%'
    const class_info = "select s.sid,s.name,c.cname from student s join class c on s.cid=c.cid where c.cid=? and s.name like ?"

    db.query(class_info, [cid, search], function (err, results) {
        if (err) {
            return res.cc(err)
        }
        else (
            res.send({
                status: 0,
                message: "班级列表查询成功",
                data: results
            })
        )
    })
    // console.log(req.body)
}

exports.adds = (req, res) => {
    const { cid, sid } = req.body
    const add_student = 'update student set cid=? where sid=?'
    db.query(add_student, [cid, sid], function (err, results) {
        if (err) {
            return res.cc(err)
        }
        else (
            res.send({
                status: 0,
                message: "添加成功",
                data: results
            })
        )
    })
}

exports.deletes=(req,res)=>{
    const getsid=req.body.sid
    // const delete_student=null
    
    const delete_student='update student set cid=null where sid=?'
    
    db.query(delete_student,getsid,function(err,results){
        if (err) {
            return res.cc(err)
        }
        else (
            res.send({
                status: 0,
                message: "删除学生成功"
            })
        )
    })
}

exports.getstudents=(req,res)=>{
    const get_students='select * from student where cid is null'
    db.query(get_students,function(err,results){
        if (err) {
            return res.cc(err)
        }
        else (
            res.send({
                status: 0,
                message: "查询成功",
                data:results
            })
        )
    })
}

exports.modifyclass=(req,res)=>{
    const {sid,cid}=req.body
    const modifysql='update student set cid=? where sid=?'
    db.query(modifysql,[cid,sid],function(err,results){
        if (err) {
            return res.cc(err)
        }
        else (
            res.send({
                status: 0,
                message: "修改班级成功"
            })
        )
    })
}