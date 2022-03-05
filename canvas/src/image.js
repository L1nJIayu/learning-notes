
window.onload = function() {

    // 找到画布对象
    let canvas = document.querySelector('#canvas')

    // 找到上下文对象（相当于画笔）
    let ctx = canvas.getContext('2d')   // CanvasRenderingContext2D

    console.log([canvas, ctx])

    /* 图片 */
    let img1 = new Image()
    img1.src = './imgs/img1.webp'

    img1.onload = function() {
        ctx.drawImage(img1, 100, 100, 200, 150)
        /* 添加水印 */
        ctx.font = "28px 微软雅黑"
        ctx.strokeStyle = 'rgba(0, 0, 0, .3)'
        ctx.rotate(Math.PI / 4)
        ctx.strokeText("Jeffrey 水印", 180, 0)
        
        /* 裁剪 */
        ctx.rotate(-Math.PI / 4)
        // 前面四个参数，是原始图片的裁剪位置及宽高
        // 后面四个参数，是最终裁剪出来的图片，在当前画布的显示位置和宽高
        ctx.drawImage(img1, 70, 150, 150, 150, 100, 280, 150, 150)
    }

}
