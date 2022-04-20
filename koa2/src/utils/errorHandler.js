
// 服务器错误
const serverErrorHandler = (err, ctx) => {
    ctx.status = 500
    ctx.body = {
        code: 5000,
        msg: '服务器错误，请联系管理员',
        data: err
    }
}

// 统一错误处理
const errorHandler = (err, ctx) => {
    let status = 400
    console.log(err)
    switch(err.code) {
        case 4000:
            status = 400
            break
    }

    ctx.status = status
    ctx.body = err
}

module.exports = {
    serverErrorHandler,
    errorHandler
}