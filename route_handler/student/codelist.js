const db = require('../../db/index.js')


codelist = (req, res) => {
    //从token中获取账号

    const account = req.auth.account

    //获取分页信息和查询信息
    const currentPage = req.body.currentPage
    const pageSize = Number(req.body.pageSize)
    const offset = (currentPage - 1) * pageSize

    const state = req.body.state
    const mustdo = req.body.mustdo

    //从数据库中查找对应id
    const find_id = 'select sid from student where account = ?'

    //期约连锁实现异步代码同步执行
    let p = new Promise((resolve, reject) => {
        db.query(find_id, [account], function (err, results) {
            if (err) {
                res.send('未找到做题记录')
                reject('未找到做题记录')
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
        // 注意你的SQL语句由于stu表的消失，应换成student表
        //查询语句，查找题目id，题目名字，题目状态（好像还不太对（划掉）（现在对了））
        //ps:虽然不推荐笛卡尔积，但是这里暂时没有更好的方法了，欢迎优化
        let find_sql = `select pbName,state,deliveryTime,mustdo,problem.pid as pid
                        from problem
                        join problemlist
                        on problemlist.pid = problem.pid
                        join student
                        on problemlist.cid=student.cid
                        left join recordlist
                        on recordlist.pid=problem.pid
                        and student.sid = recordlist.sid
                        where student.sid=?`



        //如果state=0则查所有，不添加state查询相关语句
        //如果state=1则查未完成题目
        if (state != 0) find_sql += ' and'

        if (state == 1) {
            find_sql += ' (state=1 or state is null)'
        }

        //如果state=2/3则查对应状态题目
        else if (state == 2 || state == 3) {
            find_sql += ' state =' + state
        }

        //如果需要查询state和mustdo状态则添加and
        if (mustdo != 0) {
            find_sql += ' and'
        }

        //如果需要查询mustdo则添加语句
        if (mustdo != 0) {
            find_sql += ' mustdo=' + mustdo
        }


        //题目排序
        find_sql += ` order by problem.pid`

        //执行查询语句
        if (!mustdo)
            console.log("mustdo=(" + mustdo + ")")
        db.query(find_sql, [sid], function (err, results) {
            if (err) {
                res.cc(err)
                console.log(err)
            }

            //获取题目总数
            const countAll = results.length
            //进行分页操作
            results = results.slice(offset, offset + pageSize)

            //发送至前端
            res.send({
                status: 0,
                message: "查询状态成功",
                data: {
                    currentPage,
                    pageSize,
                    countAll,
                    results
                }
            })
        })
    },
        (reason) => { console.log(reason) }
    )
}

module.exports = codelist

