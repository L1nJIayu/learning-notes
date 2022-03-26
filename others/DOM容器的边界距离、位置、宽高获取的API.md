# DOM容器的边界距离、位置、宽高获取的API



[Element.getBoundingClientRect()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect)

> domRect = element.getBoundingClientRect();

该方法返回一个DOMRect对象，距离和位置是依据视口的左上角来计算的。

对象属性如下：

```javascript
let domRect = {
    
    bottom: 1272,
    left: 0,
    right: 1727,
    top: 0,
    
    width: 1727,
    height: 1272,
    
    x: 0,
    y: 0
}
```

【注意】由于是相对于视口左上角计算，如果出现滚动的情况，有可能会出错。可配合`window.scrollX`和`window.scrollY`进行计算。

```javascript
let leftDistance = window.scrollX + domRect.left
let topDistance = window.scrollY + domRect.top
```

