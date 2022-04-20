const path = require('path')
class GalleryController {
    async uploadExhibit(ctx, next) {
        try {
            const { file: { path: filePath } } = ctx.request.files
            const url = `http://localhost:3131/${ path.basename(filePath) }`
            ctx.app.emit('successHandler', { ctx, msg: '文件上传成功', data: url })
        } catch (err) {
            console.error(err)
            ctx.app.emit('serverErrorHandler', err, ctx)
        }
    }
}


module.exports = new GalleryController()