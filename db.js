// 废弃的 mongoDB 可能以后会用到？

// const mongoose = require("mongoose") //引入mongoose
// const { Schema } = mongoose

// const db = mongoose.connection
// db.on('error', function callback () { //监听是否有异常
//     console.log("Connection error")
// })
// db.once('open', function callback () { //监听一次打开
//     //在这里创建你的模式和模型
//     console.log('connected!')
// })
// db.on('connected', () => {
//     console.log('MongoDB connected success')
// })
// db.on('disconnected', () => {
//     console.log('MongoDB connected disconnected')
// })

// mongoose.connect('mongodb://localhost/first') // 连接到mongoDB的xxx数据库
// // 该地址格式：mongodb://[username:password@]host:port/database[?options]
// // 默认port为27017

// // Schema (属性)：在Mongoose里一切都是从Schema开始的，每一个Schema都会映射到MongoDB的一个collection上。
// // Schema定义了collection里documents的模板（或者说是框架）。【一种以文件形式存储的数据库模型骨架，不具备数据库的操作能力】

// var usersSchema = Schema({
//     _id: Schema.Types.ObjectId,
//     name: String,
//     account: String,
//     password: String,
// })

// var questionesSchema = Schema({
//     _id: Schema.Types.ObjectId,
//     title: String,
//     pubdate: String,
//     detail: String,
//     idDemand: String
// })

// var recordsSchema = Schema({
//     _id: Schema.Types.ObjectId,
//     user_id: { type: Schema.Types.ObjectId, ref: 'Users' },
//     question_id: { type: Schema.Types.ObjectId, ref: 'Questiones' },
//     status: { type: Number, default: -1 },
//     finish_time: String,
//     comment: String,
// })

// // model (模型)：为了使用定义好的Schema，我们需要把blogSchema转换成我们可以使用的model
// // (其实是把Schema编译成model，所以对于Schema的一切定义都要在compile之前完成)。也就是说model才是我们可以进行操作的handle。
// mongoose.model('Users', usersSchema)//将该Schema发布为Model
// mongoose.model('Questiones', questionesSchema)
// mongoose.model('Records', recordsSchema)

// module.exports = mongoose
