const db=require('../../db/index')

sflist=(req,res)=>{
    const pid=req.body.pid
    const cid=req.body.cid
    const pageSize=req.body.pageSize
    const currentPage=req.body.currentPage
    const offset=(currentPage-1)*pageSize

    const find_sql=`select student.sid,pbName,endTime,state,name
                    from student
                    left join recordlist
                    on student.sid = recordlist.sid
                    join problem
                    on problem.pid=recordlist.pid
                    where cid =? and problem.pid=?`
    
    db.query(find_sql,[cid,pid],(err,results)=>{
        if(err){
            res.cc(err)
        }
        else{
            length=results.length
            results = results.slice(offset, offset + pageSize)
            res.send({
                status:'0',
                message:'ok',
                data:{
                    currentPage:currentPage,
                    pageSize:pageSize,
                    countAll:length+'',
                    results:results
                }
            })
        }
    })
}
module.exports=sflist