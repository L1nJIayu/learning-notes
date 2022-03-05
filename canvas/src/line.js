
window.onload = function() {

    // 找到画布对象
    let canvas = document.querySelector('#canvas')

    // 找到上下文对象（相当于画笔）
    let ctx = canvas.getContext('2d')   // CanvasRenderingContext2D

    console.log([canvas, ctx])
    
    /* 绘制线段 */
    ctx.beginPath()
    ctx.lineWidth = 5
    ctx.lineCap = "round"
    ctx.lineJoin = "round"
    ctx.strokeStyle = "#0f0"

    ctx.moveTo(350, 280)
    ctx.lineTo(350, 350)
    ctx.lineTo(450, 350)
    ctx.lineTo(400, 320)

    ctx.stroke()
    ctx.closePath()



}
