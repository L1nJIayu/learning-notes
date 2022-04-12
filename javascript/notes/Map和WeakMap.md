# Map和WeakMap

​	Map和WeakMap是ES6的新的集合数据结构，主要是为了解决Object类型的数据，只能以字符串作为键，导致的某些限制而诞生的。

​	来看一个Object类型的例子

```javascript
let obj = {}
let element = document.querySelector('#div')

obj[element] = 'metadata'
obj['[object HTMLDivElement]']	// "metadata"
```

​	由于只能以字符串作为键名，所以`element`被自动转成了字符串`[object HTMLDivElement]`。



## Map













## WeakMap













