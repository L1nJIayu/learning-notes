const jwt = require('jsonwebtoken')
const { auth: { JsonWebTokenError, TokenExpiredError } } = require('../constant/error.type')

// 验证token
const auth = async (ctx, next) => {
    try {
        const { authorization = '' } = ctx.request.header
        if(!authorization) {
            ctx.app.emit('errorHandler', JsonWebTokenError, ctx)
            return
        }
        const { JWT_SECRET } = process.env
        const token = authorization.replace('Bearer ', '')
        const payload = jwt.verify(token, JWT_SECRET)
        ctx.state.user = payload
        return await next()
    } catch(err) {
        ctx.body = err
        switch(err.name) {
            case 'TokenExpiredError':
                ctx.app.emit('errorHandler', TokenExpiredError, ctx)
                return
            case 'JsonWebTokenError':
                ctx.app.emit('errorHandler', JsonWebTokenError, ctx)
                return
            default:
                ctx.body = err
                return
        }
    }
}

module.exports = {
    auth
}