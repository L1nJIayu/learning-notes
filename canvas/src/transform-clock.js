/**
 * 时钟
 * 结合translate、rotate、scale方法绘制时钟
 */
window.onload = function() {

    // 找到画布对象
    let canvas = document.querySelector('#canvas')

    // 找到上下文对象（相当于画笔）
    let ctx = canvas.getContext('2d')   // CanvasRenderingContext2D
    
    console.log([canvas, ctx])

    /* 基本配置 */
    let clock_x = 300
    let clock_y = 200
    let clock_size = 100
    ctx.translate(clock_x, clock_y)
        
    setInterval(() => {
        renderClock()
    }, 1000)




    /* 时钟渲染 */
    function renderClock() {
        ctx.clearRect(-clock_x, -clock_y, 800, 600)
        
        ctx.save()

        /* 时钟外壳 */
        ctx.lineWidth = 5
        ctx.strokeStyle = "gray"
        ctx.beginPath()
        ctx.arc(0, 0, clock_size, 0, Math.PI * 2, false)
        ctx.stroke()
        ctx.closePath()
    
        
        /* 刻度 */
        // 时
        for(let i = 0; i < 12; i++) {
    
            ctx.beginPath()
    
            ctx.moveTo(clock_size - 10, 0)
            ctx.lineTo(clock_size, 0)
            
            ctx.stroke()
            ctx.closePath()
            ctx.rotate(Math.PI / 6)
        }
        // 分
        ctx.lineWidth = 1
        for(let i = 0; i < 60; i++) {
    
            ctx.beginPath()
    
            ctx.moveTo(clock_size - 10, 0)
            ctx.lineTo(clock_size - 5, 0)
            
            ctx.stroke()
            ctx.closePath()
            ctx.rotate(Math.PI / 30)
        }
    


        
        /* 指针 */
        let time = new Date()

        let hours = time.getHours()
        hours = hours > 12 ? hours - 12 : hours
        let minutes = time.getMinutes()
        let seconds = time.getSeconds()


        // 时针
        ctx.restore()
        ctx.save()

        ctx.beginPath()
        ctx.strokeStyle = "#ddd"
        ctx.rotate(Math.PI / 6 * hours)
        ctx.lineWidth = 6
        ctx.moveTo(0, 0)
        ctx.lineTo(0, -(clock_size - 50))

        ctx.stroke()
        ctx.closePath()
        

        // 分针
        ctx.restore()
        ctx.save()

        ctx.beginPath()
        ctx.strokeStyle = "#ddd"
        ctx.rotate(Math.PI / 30 * minutes)
        ctx.lineWidth = 3
        ctx.moveTo(0, 0)
        ctx.lineTo(0, -(clock_size - 30))
        ctx.stroke()
        ctx.closePath()

        
        // 秒针
        ctx.restore()
        ctx.save()
        ctx.strokeStyle = "red"
        ctx.beginPath()
        ctx.rotate(Math.PI / 30 * seconds)
        
        ctx.moveTo(0, 0)
        ctx.lineTo(0, -(clock_size - 15))
        ctx.stroke()
        ctx.closePath()

        /* 中间圆心 */
        ctx.restore()
        ctx.save()

        ctx.beginPath()
        ctx.arc(0, 0, 8, 0, Math.PI * 2)
        ctx.fill()
        ctx.closePath()
    
        /* 时间文本 */
        ctx.restore()
        ctx.save()
        ctx.lineWidth = 1
        ctx.strokeStyle = "gray"
        let time_x = -200
        let time_y = -clock_size - 50
    
        ctx.beginPath()
        ctx.font = "16px 微软雅黑"
        ctx.fillText(time, time_x, time_y)
        ctx.stroke()
        ctx.closePath()

        ctx.restore()
    }
}

