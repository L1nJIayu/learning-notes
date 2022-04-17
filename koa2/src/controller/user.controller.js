const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const service = require('../service/user.service') 
const { user: { loginError, userNotExisted } } = require('../constant/error.type')
const { JWT_SECRET } = require('../config/config.dev')


class UserControler {

    // 添加用户
    async addUser(ctx, next) {
        const { username, password } = ctx.request.body
        try {
            const res = await service.addUser(username, password)
            ctx.app.emit('successHandler', { ctx, data: res, msg: '用户创建成功' })
        } catch (err) {
            console.error(err)
            ctx.app.emit('serverErrorHandler', err, ctx)
        }
    }

    // 用于用户列表（非分页）
    async getUserList(ctx, next) {
        try {
            let res = await service.getUserList()
            ctx.app.emit('successHandler', { ctx, data: res, msg: '查询成功' })
        } catch (err) {
            console.error(err)
            ctx.app.emit('serverErrorHandler', err, ctx)
        }
    }

    // 登录
    async login(ctx, next) {
        try {
            const { username = '', password = '' } = ctx.request.body

            const user_target = await service.getUser({ username })

            if(user_target && bcrypt.compareSync(String(password), user_target.password)) {
                const { id, username } = user_target
                const payload = { id, username }
                const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' })
                ctx.app.emit('successHandler', { ctx, data: { token }, msg: '登陆成功' })
            } else {
                ctx.app.emit('errorHandler', loginError, ctx)
            }


        } catch(err) {
            console.error(err)
            ctx.app.emit('serverErrorHandler', err, ctx)
        }
    }

    // 修改密码
    async resetPassword(ctx, next) {
        try {
            const { id } = ctx.state.user
            const { password } = ctx.request.body

            await service.updateUserById({ id, password })
            ctx.app.emit('successHandler', { ctx, data: null, msg: '密码修改成功'})

        } catch (err) {
            console.error(err)
            ctx.app.emit('serverErrorHandler', err, ctx)
        }
    }

}

module.exports = new UserControler()