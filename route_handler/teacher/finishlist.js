const db =require('../../db/index.js')

finishlist = (req,res)=>{
    const cid=req.body.cid
    const mustdo=req.body.mustdo
    const currentPage=req.body.currentPage
    const pageSize=req.body.pageSize
    const offset = (currentPage - 1) * pageSize

    //计算题目信息
    let finish_sql=  `select problem.pid,pbName,deliveryTime,mustdo
                        from problemlist left join problem
                        on problem.pid = problemlist.pid
                        where problemlist.cid=?`
    if(mustdo!=0){
        finish_sql+=` and mustdo = `+mustdo
    }

    //计算班级完成总量
    let count_finish=`select pc.cid,pc.pid,count(sid)finishnum
                        from (select problem.pid,cid
                                from problemlist left join problem
                                on problem.pid = problemlist.pid
                                where problemlist.cid=?`
    if(mustdo!=0){
        count_finish+=` and mustdo = `+mustdo
    }
    count_finish+=`) as pc
                        left join (select pid,cid,student.sid
                                from recordlist join student
                                on recordlist.sid = student.sid
                                where state=2 or state=3) as sr
                        on sr.pid=pc.pid
                        and sr.cid=pc.cid
                        group by cid,pid
                        order by cid,pid`

    //计算班级人数总量
    const count_all=   `select count(sid)allnum
                        from student
                        where cid = ?`
                        
    //三层嵌套查询题目信息，完成人数，总人数
    db.query(finish_sql,[cid],function(err,results){
        if(err){
            console.log(err)
            res.cc(err)
        }
        else{
            db.query(count_finish,[cid,cid],function(err,results2){
                if(err){
                    console.log(err)
                    res.cc(err)
                }
                else{
                    db.query(count_all,[cid],function(err,results3){
                        if(err){
                            console.log(err)
                            res.cc(err)
                        }
                        else{
                            //对返回结果进行格式化
                            for(let i=0;i<results.length;i++){
                                
                                results[i].finishnum=results2[i].finishnum+''
                                results[i].allnum=results3[0].allnum+''
                                results[i].mustdo=results[i].mustdo+''
                                results[i].pid=results[i].pid+''
                            }
                            length=results.length
                            results = results.slice(offset, offset + pageSize)
                            res.send({
                                    status:'0',
                                    message:"ok",
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
            })
        }
    })
}

module.exports=finishlist