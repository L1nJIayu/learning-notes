
window.onload = function() {

    // 找到画布对象
    let canvas = document.querySelector('#canvas')

    // 找到上下文对象（相当于画笔）
    let ctx = canvas.getContext('2d')   // CanvasRenderingContext2D

    console.log([canvas, ctx])

    let video = document.querySelector('video')
    let vTimer = null
    video.onplay = function() {
        vTimer = setInterval(() => {
            // 绘制电影效果
            ctx.clearRect(0, 0, 800, 600)
            ctx.fillRect(0, 0, 800, 600)
            // 绘制视频
            ctx.drawImage(video, 0, 100, 800, 300)
        }, 16)
    }
    video.onpause = function() {
        clearInterval(vTimer)
    }

}
