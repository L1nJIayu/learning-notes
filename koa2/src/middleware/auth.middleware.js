const jwt = require('jsonwebtoken')
const auth = async (ctx, next) => {
    try {
        const { JWT_SECRET } = process.env
        const { authorization } = ctx.request.header
        const token = authorization.replace('Bearer ', '')
        const payload = jwt.verify(token, JWT_SECRET)
        ctx.state.user = payload
        return await next()
    } catch(err) {
        ctx.body = err
        switch(err.name) {
            case 'TokenExpiredError':
                ctx.body = {
                    code: 4000,
                    data: null,
                    msg: 'Token已过期'
                }
                return
            case 'JsonWebTokenError':
                ctx.body = {
                    code: 4000,
                    data: null,
                    msg: '无效Token'
                }
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