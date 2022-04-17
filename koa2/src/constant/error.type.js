module.exports = {
    user: {
        usernameAlreadyExisted: {
            code: 4000,
            msg: '用户名已存在',
            data: null
        },
        usernameNotNull: {
            code: 4000,
            data: null,
            msg: '用户名不能为空'
        },
        passwordNotNull: {
            code: 4000,
            data: null,
            msg: '密码不能为空'
        },
        loginError: {
            code: 4000,
            data: null,
            msg: '用户名密码错误'
        },
        userNotExisted: {
            code: 4000,
            msg: '此用户不存在',
            data: null
        }
    }
}