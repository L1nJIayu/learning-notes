
const bcrypt = require('bcryptjs')
const Joi = require('joi')

const service = require('../service/user.service')
const { user: { usernameAlreadyExisted, usernameNotNull, passwordNotNull } } = require('../constant/error.type')

const paramsValidator = ( routeName ) => {
    return async (ctx, next) => {
        switch(routeName) {
            case '/add':
                Joi.object({
                    username: Joi.string().required(),
                    password: Joi.string().required()
                })
                break
        }
        console.log(routeName, ctx.request.body)
        await next()
    }
}

// username 参数验证
const usernameValidator = async (ctx, next) => {

    try {
        const { username } = ctx.request.body
    
        if(!username) {
            ctx.app.emit('errorHandler', usernameNotNull , ctx)
            return
        } else if (typeof username !== "string") {
            ctx.app.emit('errorHandler', { code: 4000, msg: '用户名只能是字符串类型', data: null } , ctx)
            return
        } else if (username.length > 20) {
            ctx.app.emit('errorHandler', { code: 4000, msg: '用户名长度不能超过20个字符', data: null}, ctx)
            return
        }
    
    } catch (err) {
        ctx.app.emit('serverErrorHandler', err, ctx)
    }

    await next()

}

// password 参数验证
const passwordValidator = async (ctx, next) => {
    try {

        const { password } = ctx.request.body

        if(!password) {
            ctx.app.emit('errorHandler', passwordNotNull , ctx)
            return
        }
    
    } catch (err) {
        ctx.app.emit('serverErrorHandler', err, ctx)
    }

    await next()
}

// 用户名唯一验证
const userUniqueValidator = async (ctx, next) => {

    const { username } = ctx.request.body

    try {
        const user = await service.getUser({ username })
        if(user) {
            ctx.app.emit('errorHandler', {
                ...usernameAlreadyExisted,
                msg: `用户名${ username }已存在`,
            }, ctx)
            return
        }
    } catch (err) {
        console.error(err)
        ctx.app.emit('serverErrorHandler', err, ctx)
        return
    }

    await next()
}

// 密码加密
const cryptPassword = async (ctx, next) => {
    const { password } = ctx.request.body

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(String(password), salt)

    ctx.request.body.password = hash

    await next()
}

module.exports = {
    paramsValidator,
    usernameValidator,
    passwordValidator,
    userUniqueValidator,
    cryptPassword
}