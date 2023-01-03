const db = require('../../db/index.js')

exports.searchInfo = (req,res)=>{
    //从token中获取账号
    const account=req.auth.account
    //从数据库中查找对应信息
    const find_info="select nickname,name,gender,account from student where sid=?"
    const find_id = 'select sid from student where account = ?'
    //期约连锁实现异步代码同步执行

    db.query(find_id, [account], function (err, results) {
            if (err) {
                return res.cc('err')
            }
            else {
                sid = results[0].sid
                db.query(find_info,[sid],function(err,results2){
                    if(err){
                        return res.cc(err)
                    }
                    else{
                        res.send({
                            status:0,
                            message:'查询成功',
                            data: results2
                        })
                    
                    }
                })
            }
        })
  
}

exports.editInfo = (req,res) => {
    console.log(req.body)
    const account = req.auth.account
    const {nickname,name,gender}=req.body
    const alter_info = 'UPDATE student SET nickname=?,name=?,account=?,gender=? WHERE sid = ?'
    const find_id = 'select sid from student where account = ?'

    db.query(find_id, [account], function (err, results) {
        if (err) {
            res.cc('err')
        }
        else {
            //将id设置在sid中
            const sid = results[0].sid
             db.query(alter_info,[nickname,name,account,gender,sid],function(err,results2){
                if(err){
                    return res.cc(err)
                }
                else(
                    res.send({
                        status:0,
                        message:'修改成功',
                        data:results2
                    })
                )
            })
        }
    })

   
    
}
