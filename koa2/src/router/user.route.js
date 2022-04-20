const Router = require('koa-router')

const { getUserList, addUser, login, resetPassword} = require('../controller/user.controller')
const { paramsValidator, usernameValidator, passwordValidator, userUniqueValidator, cryptPassword } = require('../middleware/user.middleware')
const { auth } = require('../middleware/auth.middleware')

const router = new Router({ prefix: '/users' })

// 用户列表
router.get('/list', getUserList)
// 添加用户
// router.post('/add', usernameValidator, passwordValidator, userUniqueValidator, cryptPassword, addUser)
router.post('/add', paramsValidator('/add'), usernameValidator, passwordValidator, userUniqueValidator, cryptPassword, addUser)
// 登录
router.post('/login', usernameValidator, passwordValidator, login)
// 修改密码
router.post('/resetPassword', auth, passwordValidator, cryptPassword, resetPassword)

module.exports = router