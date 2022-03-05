/**
 * 
 * 实现文本的滚动（弹幕效果）
 */

window.onload = function() {

    let canvas = document.querySelector('#canvas')
    let ctx = canvas.getContext('2d')

    ctx.font = "16px 微软雅黑"

    /* 弹幕效果 */
    let font_X = 800
    let speed = 1
    setInterval(() => {
        ctx.clearRect(0, 0, 800, 800)
        font_X -= speed
        if(font_X < -150) font_X = 800

        ctx.fillText("hello world", font_X, 100)
        ctx.strokeText("hello canvas", font_X, 150)
    }, 16)


}

