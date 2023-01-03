const db = require('../../db/index')

review=(req,res)=>{
    const sid=req.body.sid
    const pid=req.body.pid

    const find_sql=`select content,comment,score
                    from recordlist
                    where sid=? and pid=?`
    db.query(find_sql,[sid,pid],(err,results)=>{
        if(err){
            res.cc(err)
        }
        else{
            if(results.length==0){
                results[0].content=null
                results[0].comment=null
                results[0],score=0
            }
            res.send({
                status:'0',
                message:'ok',
                data:{
                    content:results[0].content,
                    comment:results[0].comment,
                    score:results[0].score+''
                }
            })
        }
    })
}
module.exports=review