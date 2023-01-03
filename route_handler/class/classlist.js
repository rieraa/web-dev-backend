const db = require('../../db/index.js')

classlist = (req,res)=>{
    const query_sql='select cid,cname from class'
    db.query(query_sql,[],function(err,results){
        if(err){
            res.cc(err)
        }
        else{
            res.send({
                status:0,
                message:"查询成功",
                data:results
            })
        }
    })
}

module.exports = classlist