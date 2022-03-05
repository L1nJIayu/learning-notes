# je-practice-canvas
canvas学习笔记


### 实例

以下实例,是根据所学知识,完成的一些小Demo:

 - [时钟](http://119.91.211.99/clock)
 - [刮刮乐](http://119.91.211.99/scratcher/)



## canvas三要素

- id：唯一标识
- width：画布内容 **宽度** 的像素大小
- height：画布内容的 **高度** 的像素大小

```html
<canvas id="canvas" width="600" height="400" style="width: 600px;height: 400px;">
	正常情况下，这里的文本内容是不会显示的
</canvas>
```

​	canvas仅仅只是一个画布标签，要绘制内容，必须使用js绘制。

​	width、height属性与style的宽高是有区别的，可以理解为屏幕像素，例如1920*1080



## 上下文对象 [CanvasRenderingContext2D](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D)



```javascript
// 找到画布对象
let canvas = document.querySelector('#canvas')
// 找到上下文对象（相当于画笔）
let ctx = canvas.getContext('2d')   // CanvasRenderingContext2D

console.log([canvas, ctx]) // 输出看看
```

<img src=".\readme-images\CanvasRenderingContext2D.png" alt="CanvasRenderingContext2D对象"  />

【补充】

​	` canvas.getContext('2d') `绘制的是2D图形，如果需要绘制3D的，参数为webgl。





## 绘制图形



#### 矩形

```javascript
let canvas = document.querySelector('#canvas')
let ctx = canvas.getContext('2d')

// 绘制路径
ctx.rect(50, 50, 200, 200)	// x, y, width, height

// 填充（背景）
ctx.fillStyle = "#ff0"
ctx.fill()

// 描边，渲染路径
ctx.lineWidth = "3px"
ctx.strokeStyle = "#f00"
ctx.stroke()
    
```

<img src=".\readme-images\rect.png" alt="矩形"  />

#### 线段

```javascript

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
```

<img src=".\readme-images\line.png" alt="线段"  />

| 属性      | 描述                                                         |
| --------- | ------------------------------------------------------------ |
| lineCap   | 线末端的类型。 允许的值： `butt` (默认), `round`, `square`   |
| linejoin  | 定义两线相交拐点的类型。允许的值：`round`, `bevel`, `miter`(默认)。 |
| lineWidth | 线的宽度。默认 `1.0`                                         |
| lineLimit | 斜接面限制比例。默认 `10。`                                  |



#### 圆

```javascript
ctx.beginPath()
ctx.arc(400, 100, 100, 0, Math.PI, false)
ctx.stroke()
ctx.closePath()

ctx.beginPath()
ctx.arc(600, 200, 100, 0, Math.PI, true)
ctx.stroke()
ctx.closePath()
```

<img src=".\readme-images\circle.png" alt="圆"  />

> void ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);

| 参数          | 描述                                                         |
| ------------- | ------------------------------------------------------------ |
| x             | 圆弧中心（圆心）的 x 轴坐标。                                |
| y             | 圆弧中心（圆心）的 y 轴坐标。                                |
| radius        | 圆弧的半径。                                                 |
| startAngle    | 圆弧的起始点， x轴方向开始计算，单位以弧度表示。             |
| endAngle      | 圆弧的终点， 单位以弧度表示。                                |
| anticlockwise | 可选的[`Boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean)值 ，如果为 `true`，逆时针绘制圆弧，反之，顺时针绘制。 默认为false。 |



#### 文本

```javascript
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

```

<img src=".\readme-images\text.png" alt="文本"  />

| 方法         | 描述                          |
| ------------ | ----------------------------- |
| fillText()   | 在(x,y)位置绘制（填充）文本。 |
| strokeText() | 在(x,y)位置绘制（描边）文本。 |
|              |                               |
|              |                               |





#### 图片

> void ctx.drawImage(image, dx, dy); 
>
> void ctx.drawImage(image, dx, dy, dWidth, dHeight); 
>
> void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);

​	绘制指定的图片。该方法有多种格式，提供了很大的使用灵活性。

```javascript
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
```

<img src=".\readme-images\drawImage.png" alt="图片绘制"  />



#### 视频

​	视频其实也是图片一帧一帧的播放，所以利用绘制图片的原理，也可以做到绘制视频，这样不会容易被人轻易copy视频资源。

```html
<canvas id="canvas" width="800" height="500">
    正常情况下，这里的文本内容是不会显示的
</canvas>
<video src="./video/flower.webm" controls width="500" height="400"></video>
```

```javascript
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
```

<img src=".\readme-images\video.png" alt="视频绘制" style="zoom:67%;" />

​	利用绘制的视频，结合绘制文本，即可实现视频的弹幕效果。

[视频获取](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video)





## 图形变换



### translate

> void ctx.translate(x, y);

​	移动。该方法移动的是原坐标的原点位置。



### rotate

> void ctx.rotate(angle);

​	旋转。该方法旋转的是整个坐标轴的角度。



### scale

> void ctx.scale(x, y);

​	缩放。x为水平方向的缩放因子，y为垂直方向的缩放因子。

​	默认的， 在 canvas 中一个单位实际上就是一个像素。例如，如果我们将0.5作为缩放因子，最终的单位会变成0.5像素，并且形状的尺寸会变成原来的一半。相似的方式，我们将2.0作为缩放因子，将会增大单位尺寸变成两个像素。形状的尺寸将会变成原来的两倍。



【注意】

​	以上方法，每次调用，相当于把坐标尺改变了，再进行之后的图形绘制。在改变之前已经绘制的图形，是不会有影响的。

​	借助save()、restore()可以对画笔状态进行保留和恢复，利用这点，可以保留和恢复默认的画笔状态，就不用每次都改回原始值了。



### 实例

[实例 - 时钟](http://119.91.211.99/clock)





## 合成

​	[globalCompositeOperation](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation)，在已经存在的位图上绘制图形和图像。

```javascript
ctx.fillStyle = "hotpink"
ctx.fillRect(50, 50, 100, 100)

ctx.globalCompositeOperation = 'xor'

ctx.fillStyle = "deepskyblue"
ctx.fillRect(100, 100, 100, 100)
```

<img src=".\readme-images\globalCompositeOperation.png" alt="globalCompositeOperation"  />


| 参数值           | 描述                                                         |
| ---------------- | ------------------------------------------------------------ |
| source-over      | 默认值。在现有画布上下文之上绘制新图形。                     |
| source-in        | 新图形只在新图形和目标画布重叠的地方绘制。其他的都是透明的。 |
| source-out       | 在不与现有画布内容重叠的地方绘制新图形。                     |
| source-atop      | 新图形只在与现有画布内容重叠的地方绘制。                     |
| destination-over | 在现有的画布内容后面绘制新的图形。                           |
| destination-in   | 现有的画布内容保持在新图形和现有画布内容重叠的位置。其他的都是透明的。 |
| destination-out  | 现有内容保持在新图形不重叠的地方。                           |
| destination-atop | 现有的画布只保留与新图形重叠的部分，新的图形是在画布内容后面绘制的。 |
| lighter          | 两个重叠图形的颜色是通过颜色值相加来确定的。                 |
| copy             | 只显示新图形。                                               |
| xor              | 图像中，那些重叠和正常绘制之外的其他地方是透明的。           |
| multiply         | 将顶层像素与底层相应像素相乘，结果是一幅更黑暗的图片。       |
| screen           | 像素被倒转，相乘，再倒转，结果是一幅更明亮的图片。           |
| .....            | （还有好多，直接看[文档](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation)吧） |





### 保存画布内容

canvas.toDataURL()，会返回一个BASE64编码的字符串
