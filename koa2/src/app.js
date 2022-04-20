const path = require('path')

const Koa = require('koa')
const KoaBody = require('koa-body')
const staticServer = require('koa-static')

const router = require('./router')

const { serverErrorHandler, errorHandler } = require('./utils/errorHandler')
const successHandler = require('./utils/successHandler')

const app = new Koa()

const uploadFilesDir = path.join(__dirname, '../uploadFiles')

app.use(new KoaBody({
    multipart: true,
    formidable: {
        uploadDir: uploadFilesDir,
        keepExtensions: true
    }
}))
app.use(staticServer(uploadFilesDir))
app.use(router.routes()).use(router.allowedMethods())

app.on('serverErrorHandler', serverErrorHandler)
app.on('errorHandler', errorHandler)
app.on('successHandler', successHandler)

module.exports = app