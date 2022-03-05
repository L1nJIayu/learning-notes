
window.onload = function() {

    // 找到画布对象
    let canvas = document.querySelector('#canvas')

    // 找到上下文对象（相当于画笔）
    let ctx = canvas.getContext('2d')   // CanvasRenderingContext2D

    console.log([canvas, ctx])

    /* 绘制矩形 */
    // 绘制路径
    ctx.rect(50, 50, 200, 200)

    // 填充
    ctx.fillStyle = "#ff0"
    ctx.fill()

    // 描边，渲染路径
    ctx.lineWidth = "3px"
    ctx.strokeStyle = "#f00"
    ctx.stroke()

}
