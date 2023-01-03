const db = require('../../db/index')

comment=(req,res)=>{
    const sid=req.body.sid
    const pid=req.body.pid
    const comment=req.body.comment
    const score=req.body.score

    const update_comment='update recordlist set comment=?,score=?,state=3 where sid=? and pid=?'
    db.query(update_comment,[comment,score,sid,pid],function(err,results){
        if (err) {
            return res.cc(err)
        }
        else (
            res.send({
                status: 0,
                message: "查询成功"
            })
        )
    })
}
module.exports=comment