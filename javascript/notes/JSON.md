# JSON



## 语法

JSON支持三种类型的值：

1. 简单值：字符串、数值、布尔值和null。undefined不可以。
2. 数组
3. 对象



## 解析与序列化

ES5新增了全局对象JSON，正式引入了解析JSON的能力。该对象包含两个方法`stringify`和`parse`



### JSON.stringify

​	**`JSON.stringify()`** 方法将一个 JavaScript 对象或值转换为 JSON 字符串，如果指定了一个 replacer 函数，则可以选择性地替换值，或者指定的 replacer 是数组，则可选择性地仅包含数组指定的属性。

​	在序列化 JavaScript 对象时，所有函数和原型成员都会有意地在结果中省略。此外，值为 undefined的任何属性也会被跳过，`NaN`和`Infinity`会被当作`null`转换。



【语法】

> JSON.stringify(value[, replacer [, space]])

- value

  JavaScript对象，此对象作为值，将会被转化成JSON字符串。

- replacer `可选`

  该参数可以是数组或函数

  - 数组

    指定需要序列化的属性，最终输出的JSON字符串只会包含数组中有的属性。

    ```javascript
    let obj = { a: 1, b: 2, c: 3, d: 4 }
    let result = JSON.stringify(obj, ['a', 'c'])
    
    console.log(result)	// '{"a":1,"c":3}'
    ```

  - 函数

    `value`中所有的属性，都会经过该函数的处理和转化，而得到最终的结果。

    ```javascript
    let obj = {
      a: 1,
      b: 2,
      c: ''
    }
    let result = JSON.stringify(obj, (key, value) => {
      console.log(key, value)
      return value === '' ? '秀儿' : value
    })
    
    // a 1
    // b 2
    // c ''
    // '{"a":1,"b":2,"c":"秀儿"}'
    
    ```

    

- space `可选`

  指定输出后的JSON的缩紧空白，主要用于美化结果。值可以是Number类型或String类型。

  - Number类型

    最小为1，最大为10；小于1表示没有空格。

  - String类型

    字符串会被作为空格加入，若长度大于10，则只取前10个字符。

















### JSON.parse

