const Router = require('koa-router')

const { getUserList, addUser, login, resetPassword} = require('../controller/user.controller')
const { usernameValidator, passwordValidator, userUniqueValidator, cryptPassword } = require('../middleware/user.middleware')
const { auth } = require('../middleware/auth.middleware')

const router = new Router({ prefix: '/users' })

router.get('/list', getUserList)
router.post('/add', usernameValidator, passwordValidator, userUniqueValidator, cryptPassword, addUser)
router.post('/login', usernameValidator, passwordValidator, login)
router.post('/resetPassword', auth, passwordValidator, cryptPassword, resetPassword)

module.exports = router