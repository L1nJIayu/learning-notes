const Router = require('koa-router')

const router = new Router({ prefix: '/gallery' })

const { uploadExhibit } = require('../controller/gallery.controller')
const { fileValidator } = require('../middleware/gallery.middleware')
const { auth } = require('../middleware/auth.middleware')

router.post('/upload', auth, fileValidator, uploadExhibit)


module.exports = router