
window.onload = function() {

    // 找到画布对象
    let canvas = document.querySelector('#canvas')

    // 找到上下文对象（相当于画笔）
    let ctx = canvas.getContext('2d')   // CanvasRenderingContext2D


    /* 文字 */
    ctx.font = "24px 微软雅黑"

    ctx.fillStyle = '#000'
    ctx.fillText("hello world", 400, 400)

    ctx.strokeStyle = '#f00'
    ctx.lineWidth = 1

    ctx.shadowBlur = 20
    ctx.shadowColor = '#f00'
    ctx.shadowOffsetX = 10
    ctx.shadowOffsetY = 10

    ctx.strokeText("hello canvas", 400, 450)



}

