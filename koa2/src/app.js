const Koa = require('koa')
const KoaBody = require('koa-body')

const userRouter = require('./router/user.route')

const { serverErrorHandler, errorHandler } = require('./utils/errorHandler')
const successHandler = require('./utils/successHandler')

const app = new Koa()

app.use(new KoaBody())
app.use(userRouter.routes())

app.on('serverErrorHandler', serverErrorHandler)
app.on('errorHandler', errorHandler)
app.on('successHandler', successHandler)


module.exports = app