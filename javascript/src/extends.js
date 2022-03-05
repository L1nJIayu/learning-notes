
/**
 * 原型链的实现
 */
// function SuperType() {
//     this.superProp = true
//     this.colors = ['red', 'green']
// }
// SuperType.prototype.getSuperProp = function() {
//     return this.superProp
// }

// function SubType() {
//     this.subProp = false
// }
// // 让SuperType的实例，作为SubType的原型，依次类推，即可构成原型链
// SubType.prototype = new SuperType()
// SubType.prototype.getSubProp = function() {
//     return this.subProp
// }

// 如此下来，SubType的实例，便继承了SuperType所有的属性和方法
// let instance = new SubType()
// console.log(instance.getSuperProp())
// console.log(instance.getSubProp())
// console.log(instance.superProp)
// console.log(instance instanceof Object)
// console.log(instance instanceof SuperType)
// console.log(instance instanceof SubType)

// console.log(Object.prototype.isPrototypeOf(instance))
// console.log(SuperType.prototype.isPrototypeOf(instance))
// console.log(SubType.prototype.isPrototypeOf(instance))


// let instance_1 = new SubType()
// let instance_2 = new SubType()
// instance_1.superProp = '???'
// instance_1.colors = ['blue']
// console.log(instance_1)
// console.log(instance_2)
// console.log(instance_1.getSuperProp())
// console.log(instance_2.getSuperProp())
// console.log(SubType.prototype)


/**
 * 借用构造函数实现继承
 */
// function SuperType () {
//     this.colors = ['red', 'green', 'blue']
// }
// SuperType.prototype.getSuperColors = function() { return this.colors }
// function SubType() {
//     SuperType.call(this)
// }
// SubType.prototype = new SuperType()
// let instance1 = new SubType()
// let instance2 = new SubType()
// instance1.colors.push('yellow')
// console.log(instance1.colors)
// console.log(instance2.colors)

// console.log(instance1.getSuperColors())



/**
 * 原型继承
 */
//  function object(o) {
//     function F() {}
//     F.prototype = o
//     return new F()
// }

// var person = {
//     name: '???',
//     friends: ['a', 'b']
// }
// var person1 = object(person)
// var person2 = object(person)

// person1.name = '张三'
// person1.friends.push('c')

// person2.name = '李四'
// person2.friends.push('d')

// console.log(person1.name, person1.friends)
// console.log(person2.name, person2.friends)

/**
 * 原型继承
 * ES5 Object.create()
 */
var person = {
    name: '???'
}
var person1 = Object.create(person, { age: { value: 18, configurable: true }})
var person2 = Object.create(person)

person1.name = '张三'

person2.name = '李四'

console.log(person1)	// {name: '张三', age: 18}
console.log(person2)	// {name: '李四'}