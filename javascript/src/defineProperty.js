/**
 * defineProperty
 * 给对象定义单个属性
 */
let book = {
    _year: 2022,
    edition: '1.0'
}

// 数据属性
Object.defineProperty(book, "name", {
    writable: true,
    value: "默认书名"
})

// 访问器属性
Object.defineProperty(book, "year", {
    get: function() { return this._year },
    set: function(newValue) {
        if(typeof newValue === "number") {
            this._year = newValue
        }
    }
})

let result1 = Object.getOwnPropertyDescriptors(book, "name")
console.log(result1)


/**
 * defineProperties
 * 给对象同时定义多个属性
 */
let person = {
    age: 1
}
Object.defineProperties(person, {
    _name: {
        writable: true,
        value: "???"
    },
    name: {
        get: function() { return this._name },
        set: function(newValue) {
            if(typeof newValue === "string") {
                this._name = newValue
            }
        }
    }
})
let result2 = Object.getOwnPropertyDescriptors(person)
console.log(result2)