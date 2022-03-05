
window.onload = function() {

    // 找到画布对象
    let canvas = document.querySelector('#canvas')

    // 找到上下文对象（相当于画笔）
    let ctx = canvas.getContext('2d')   // CanvasRenderingContext2D

    console.log([canvas, ctx])


    /* 圆 */
    ctx.beginPath()
    ctx.arc(400, 100, 100, 0, Math.PI, false)   // 逆时针
    ctx.stroke()
    ctx.closePath()

    ctx.beginPath()
    ctx.arc(600, 200, 100, 0, Math.PI, true)    // 顺时针
    ctx.stroke()
    ctx.closePath()




}
