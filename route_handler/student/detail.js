const { Timestamp } = require("mongodb")
const db = require("../../db/index.js")
const newDate = require("../../utils/nowDate.js")

detail = (req, res) => {
    const account = req.auth.account
    const pid = req.body.pid
    const find_id = 'select sid from student where account = ?'

    //期约连锁实现异步代码同步执行
    let p = new Promise((resolve, reject) => {
        console.log(account)
        db.query(find_id, [account], function (err, results) {
            if (err) {
                res.send('未找到此学生')
                reject('未找到此学生')
            }
            else {
                //将id设置在sid中
                const sid = results[0].sid
                // 传递解决值
                resolve(sid)
            }
        })
    })

    p.then((sid) => {
        console.log("sid 和 pid", sid, pid)
        //做题记录存在即sub_content至少为一个空格，通过是否为null来判断是否存在做题记录，即是否插入该记录
        let find_sql = `select content,comment,pbContent,pbName,score,state
                        from problem
                        cross join student
                        left join recordlist
                        on problem.pid = recordlist.pid
                        and recordlist.sid = student.sid
                        where student.sid=?
                        and problem.pid=?`
        db.query(find_sql, [sid, pid], function (err, results) {
            const date = newDate()
            console.log(date)
            let msg = ''
            let state = 0
            console.log(results, pid, sid)
            if (results[0].content == null) {
                //不存在做题记录
                let inset_sql = `insert into recordlist values (?,?,?,?,null,1,'',0)`
                db.query(inset_sql, [sid, pid, date, date], function (err, results2) {

                    if (err) {
                        console.log(err)
                        res.cc('插入失败');
                    }
                    else {
                        res.send({
                            status: 0,
                            message: '插入成功',
                            data: {
                                results
                            }
                        })
                    }
                })
            }
            else {
                console.log(msg)
                msg = '查询详细成功'

                res.send({
                    status: state,
                    message: msg,
                    data: {
                        results
                    }
                })
            }


        })
    })

    // p.then((sid)=>{

    //     //做题记录存在即sub_content至少为一个空格，通过是否为null来判断是否存在做题记录，即是否插入该记录
    //     let find_sql = `select pb_content,t_comment,sub_content
    //                     from (select student.stu_id from student where stu_id = ?) as stu
    //                     cross join problems
    //                     left outer join problemlist
    //                     on stu.stu_id=problemlist.stu_id
    //                     and problems.pb_id=problemlist.pb_id
    //                     where problems.pb_id=?`
    //     new Promise((resolve,reject)=>{
    //         db.query(find_sql,[sid,pb_id],function(err,results){
    //             if(results[0].sub_content==null){
    //                 reject('存在做题记录')
    //             }
    //             else{
    //                 resolve('未找到做题记录')
    //             }
    //         })
    //     })
    // }).then(null,()=>{
    //     let inset_sql=``
    // })

}

module.exports = detail