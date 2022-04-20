const { gallery: { fileNotNull, fileTypeError } } = require('../constant/error.type')

const fileValidator = async (ctx,next) => {
    try {
        const { file } = ctx.request.files
    
        if(!file) {
            ctx.app.emit('errorHandler', fileNotNull, ctx)
            return
        } else {
            const { file: { type: fileType } } = ctx.request.files
            const validFileTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'image/webp']
            if(!validFileTypes.includes(fileType)) {
                ctx.app.emit('errorHandler', fileTypeError, ctx)
                return
            }
        }
        return await next()

    } catch (err) {
        console.error(err)
        ctx.app.emit('serverErrorHandler', err, ctx)
    }
}


module.exports = {
    fileValidator
}