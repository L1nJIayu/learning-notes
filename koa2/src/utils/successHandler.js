module.exports = function({ ctx, data, msg }) {
    ctx.body = {
        code: 2000,
        data: data || null,
        msg: msg || '成功',
    }
}