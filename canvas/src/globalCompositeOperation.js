
window.onload = function() {

    // 找到画布对象
    let canvas = document.querySelector('#canvas')

    // 找到上下文对象（相当于画笔）
    let ctx = canvas.getContext('2d')   // CanvasRenderingContext2D

    console.log([canvas, ctx])

    ctx.globalCompositeOperation = 'lighter'
    ctx.fillStyle = "#f0f"
    ctx.fillRect(50, 50, 100, 100)


    ctx.fillStyle = "#f00"
    ctx.fillRect(100, 100, 100, 100)

}
