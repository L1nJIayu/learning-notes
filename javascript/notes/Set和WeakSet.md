# Set和WeakSet





## Set

​	Set是ES6开始提供的新的集合数据结构，成员都是唯一的，不会有重复的值。



### 实例的属性和方法

1. 属性
   - Set.prototype.constructor：构造器；
   - Set.prototype.size：成员总数。
2. 方法
   - Set.prototype.add(value)：添加成员，返回Set结构本身；
   - Set.prototype.delete(value)：删除成员，返回boolean，表示删除是否成功；
   - Set.prototype.has(value)：判断成员是否存在，返回boolean；
   - Set.prototype.clear()：清空所有成员，没有返回值；
   - Set.prototype.keys()：返回键名的遍历器；
   - Set.prototype.values()：返回键值的遍历器；
   - Set.prototype.entries()：返回键值对的遍历器；
   - Set.prototype.forEach()：使用回调函数遍历每个成员。



### 需要注意的地方

1. 只要是具有`iterable`接口的数据结构，都可以作为Set构造函数的参数传入；

   ```javascript
   // 自定义可迭代对象
   const obj = {
     [Symbol.iterator]: function*() {
       yield "a";
       yield "b";
       yield "c";
     }
   };
   let set = new Set(obj);
   console.log(set);		// Set(3) {'a', 'b', 'c'}
   ```

2. Set加入值时，不会发生类型转换，即`5`和`"5"`是不同的值；

3. Set内部的NaN等于自身；

   ```javascript
   let set = new Set()
   set.add(NaN).add(NaN)
   
   console.log(set)					// Set {NaN}
   console.log(NaN == NaN) 	// false
   ```

4. Set中两个对象总是不相等的；

5. Set的遍历顺序即是插入顺序，这一点可以保证回调函数列表的调用顺序是按照插入顺序进行的；

6. Set没有键名，只有键值，所以`keys`()和`values()`的行为完全一致；`entries()`返回的数组，两个成员完全相等；

7. Set结构的实例默认可遍历，它默认遍历器生成函数就是它的`values`方法本身；

   ```javascript
   Set.prototype[Sysmbol.iterator] === Set.prototype.values	// true
   
   //这意味着可以省略values方法，直接使用for...of循环遍历Set
   let set = new Set(['a', 'b', 'c'])
   for(let x of Set) {
     console.log(x)
   }
   // a
   // b
   // c
   ```

8. `set.forEach((value, key, set) => {...}, that)`

   - 第一个参数，处理函数，参数依次为键值、键名、集合本身；
   - 第二个参数，重写处理函数内部的this指向。







### 应用



#### 1.数组去重

```javascript
let arr1 = [1,2,3,4,5,5,5,1,2,3]
let set1 = new Set(arr1)

// 利用扩展运算符
console.log([...set1])          // [1,2,3,4,5]
// 利用Array.from
console.log(Array.from(set1))   // [1,2,3,4,5]
```



#### 2. 去除字符串中的重复字符

```javascript
let str = 'aabbcc'
let set = new Set(str)

let newStr = [...set].join('')
console.log(newStr)	// 'abc'
```



#### 3. 实现并集、交集、差集

```javascript
let arr1 = ['a', 'b', 'c', 'd']
let arr2 = ['a', 'e', 'f', 'g']

// 并集
let result1 = [...new Set([...arr1, ...arr2])]
// 交集
let result2 = [...new Set(arr1.filter(item => arr2.includes(item)))]
// 差集
let result3_1 = [...new Set(arr1.filter(item => !arr2.includes(item)))]
let result3_2 = [...new Set(arr2.filter(item => !arr1.includes(item)))]

console.log('arr1', arr1)          // arr1 (4) ['a', 'b', 'c', 'd']
console.log('arr2', arr2)          // Set.html:37 arr2 (4) ['a', 'e', 'f', 'g']
console.log('并集', result1)        // Set.html:38 并集 (7) ['a', 'b', 'c', 'd', 'e', 'f', 'g']
console.log('交集', result2)        // Set.html:39 交集 ['a']
console.log('差集', result3_1)      // Set.html:40 差集 (3) ['b', 'c', 'd']
console.log('差集', result3_2)      // Set.html:41 差集 (3) ['e', 'f', 'g']
```

【补充】如果将`arr1`和`arr2`设置为Set结构，在【交集】和【差集】中，`includes`可以改为`Set.prototype.has`方法来实现。



## WeakSet



### 与Set的区别

1. 存放的成员类型只允许是Object或者继承自Object的类型，否则会抛出TypeError；

   ```javascript
   const str1 = 'abc'
   const str2 = new String('abc')
   
   new WeakSet(str1)	// TypeError: Invalid value used in weak set
   new WeakSet(str2)	// WeakSet {String}
   ```

2. WeakSet中的对象都是弱引用，只要外部没有使用该对象，则垃圾回收机制会直接释放该对象，不会考虑WeakSet中还在存放此对象；

3. 基于`第二点区别`，由于对象成员随时可能消失，所以不适合遍历，因此WeakSet不支持遍历，无`forEach`属性。

4. 没有`size`属性





### 实例的属性和方法

1. 属性
   - WeakSet.prototype.constructor：构造器；
2. 方法
   - WeakSet.prototype.add(value)：添加成员，返回WeakSet结构本身
   - WeakSet.prototype.delete(value)：删除成员，返回boolean，表示删除是否成功；
   - WeakSet.prototype.has(value)：判断成员是否存在，返回boolean；





### 应用



#### 1. 将DOM元素存放在WeakSet中

​	例如给DOM元素打标签

```javascript
let disabledElement = new WeakSet()
let loginBtn = document.querySelector('#login_btn')
disabledElement.add(loginBtn)

// 只要判断元素是否存在集合中，就知道按钮是否被禁用了
if(disabledElement.has(loginBtn)) {
  console.log('登录按钮被禁用！')
} else {
  console.log('登录按钮可用！')
}
```

​	如果使用Set存放，会出现DOM元素删除了，但是引用还在Set存放着，就会出现垃圾回收机制无法回收的问题。而存放在WeakSet，垃圾回收机制就可以忽略它的引用，直接回收释放其内存。