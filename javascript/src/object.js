

// 工厂模式
function createObj(name, age) {
    let obj = new Object()
    obj.name = name
    obj.age = age
    obj.sayName = function() {
        console.log(`我叫${ this.name }`)
    }
    return obj
}
// let person1 = createObj('张三', 16)
// let person2 = createObj('李四', 17)

// console.log(person1)
// console.log(person2)
// person1.sayName()
// person2.sayName()


// 构造函数模式
// function Person(name, age) {
//     this.name = name
//     this.age = age
//     this.sayName = function() {
//         console.log(`我叫${ this.name }`)
//     }
// }


// let person1 = new Person('张三', 16)
// let person2 = new Person('李四', 17)

// console.log(person1)
// console.log(person2)
// person1.sayName()
// person2.sayName()
// console.log(person1.constructor)
// console.log(person1 instanceof Object)
// console.log(person1 instanceof Person)


// 原型模式
function Person(name) {
    this.name = name
}
Person.prototype.age = 108
Person.prototype.sayName = function() {
    console.log(`我叫${ this.name }`)
}

let person1 = new Person('张三')
let person2 = new Person('张四')
console.log(person1.sayName == person2.sayName)
console.log(Person.prototype.isPrototypeOf(person1))
console.log(Person.prototype.isPrototypeOf(person2))
console.log(Object.getPrototypeOf(person1))
console.log(person1.__proto__)

Object.defineProperty(Person.prototype, 'testProp', {
    enumerable: false
})
for(prop in person1.__proto__) {
    console.log(prop)
}
console.log(Object.getOwnPropertyDescriptors(person1.__proto__, 'age'))

// 寄生构造函数模式
function myArray() {
    var values = new Array()
    values.push.apply(values, arguments)
    values.myArrayFoo = function() {
        console.log('这是我的Array方法')
    }
    return values
}
var arr = new myArray(1,2,32)
arr.myArrayFoo()