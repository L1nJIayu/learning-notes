# 移动端没有onmouseXXX事件怎么办？



可用touchXXX事件，兼容移动端

- touchstart：手指接触屏幕
- touchend：手指在屏幕上移动
- touchmove：手指从屏幕上移开时触发
- touchcancel：touch取消，例如电话接入等，可用于信息保存，游戏暂停等



以上事件返回的事件对象，有几个关键的常用属性，他们返回一个[TouchList](https://developer.mozilla.org/zh-CN/docs/Web/API/TouchList)，用于存放[Touch](https://developer.mozilla.org/zh-CN/docs/Web/API/Touch)对象。

- [TouchEvent.touches](https://developer.mozilla.org/zh-CN/docs/Web/API/TouchEvent/touches)：当前屏幕上所有的触摸点列表
- [TouchEvent.targetTouches](https://developer.mozilla.org/zh-CN/docs/Web/API/TouchEvent/targetTouches)：当前对象上所有的触摸点列表
- [TouchEvent.changedTouches](https://developer.mozilla.org/zh-CN/docs/Web/API/TouchEvent/changedTouches)：屏幕上，发生改变的触摸点



[Touch](https://developer.mozilla.org/zh-CN/docs/Web/API/Touch)对象的常用属性：

- identifier：Touch对象的唯一标识符

- clientX：触摸点相对于视口左边缘的x坐标，不包含滚动偏移

- clientY：触摸点相对于视口上边缘的y坐标，不包含滚动偏移

- pageX：触摸点相对于页面左边缘的x坐标，包含滚动偏移

- pageY：触摸点相对于页面上边缘的y坐标，包含滚动偏移

- screenX：触摸点相对于屏幕左边缘的x坐标

- screenY：触摸点相对于屏幕上边缘的y坐标

- target：返回触摸点最初接触的DOM

