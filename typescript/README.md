## Typescript



Typescript的学习笔记

[官方文档](https://www.tslang.cn/docs/handbook/basic-types.html)

#### 安装

```shell
 npm install -g typescript
```

#### 编译

```shell
 tsc helloworld.ts
```





### 一、数据类型



#### 类型

- 数字 number
- 字符串 string
- 数组 Array
- 元组 Tuple
- 枚举 enum
- Any
- Void
- Null
- Undefined
- Never
- Object



#### 类型注解

```typescript
// number类型
let num1: number = 1
let num2: number = 2

function sum(num1:number, num2: number) : number {
    return num1 + num2
}

sum(num1,num2)


// 数组
// 方式一
let arr1: number[] = [1, 2, 3]
// 方式二
let arr2: Array<number> = [1, 2, 3]


// 元组，【类型】和【数据的个数】一开始就限定了
let __tuple: [string, number, boolean] = ['张三', 18.1234, true]
console.log(__tuple[0].split(''))		// ['张', '三']
console.log(__tuple[1].toFixed(2))		// "18.12"


// 枚举，每个枚举元素都有默认的编号，从0开始,也可以自定义，后续自动递增
enum Color {
    RED,
    GREEN,
    BLUE,
    YELLOW = 100,
    PINK
}
let color: Color = Color.RED
console.log(color)		// 0
console.log(Color.RED, Color.GREEN, Color.BLUE)		// 0 1 2
console.log(Color.YELLOW, Color.PINK)				// 100 101
console.log(Color[100])		// YELLOW


```

[相关代码](./src/part1/type.ts)



#### 联合类型

```typescript
let test: string | number
test = 123
test = '123'
```



#### 类型断言

即告诉ts编译器，”相信我，我知道自己在干什么“，有两种形式：【尖括号的形式】和【as的形式】

```typescript
function getLen(str: number | string): number {
    if(<string>str.length) {
        return (str as string).length
    } else {
        return str.toString().length
    }
}
```







### 二、编译选项



#### 编译命令

```shell
# 手动执行编译
tsc src/part2/app.ts

# 自动检测编译
tsc src/part2/app.ts -w
```



#### 配置文件 tsconfig.json

    tsconfig.json 是ts编译器的配置文件，ts编译器可以根据它的信息来对代码进行编译。
    
    在根目录创建了这个文件以后，直接执行tsc，就可以对子目录所有ts文件进行编译了，不再需要指定具体文件。

```shell
# 初始化 tsconfig.json 生成默认的配置文件
tsc --init
# 开启自动编译
tsc -w
```

配置选项：

- include 用于指定哪些文件需要编译

    ** 表示任意目录

    *  表示任意文件

- exclude 指定哪些文件不需要编译

  默认值["node_modules", "bower_components", "jspm_packages"]
  
- extends 继承配置文件

- files 直接指定具体哪些文件需要编译

- compilerOptions 编译器的选项

  - target

        指定编译出来的ES的版本，默认为ES3
        
        可选 'es3', 'es5', 'es6', 'es2015', 'es2016', 'es2017', 'es2018', 'es2019', 'es2020', 'es2021', 'esnext'.
    
  - module
  
        指定模块化规范，即指定最终编译出来的JS使用哪种模块化的规范。
        
        可选 'none', 'commonjs', 'amd', 'system', 'umd', 'es6', 'es2015', 'es2020', 'esnext'.
    
  - lib[]

        指定项目中要用到哪些库
        
        比如写document.getElementById 其实是用到了DOM的这个库，我们在编写程序时，会有提示信息，但是如果lib里面没有DO这个库，就不会有提示。这个lib一般很少会去动它，比如在nodeJS的环境下，没有DOM环境，就可能需要进行设置。
    
  - outDir

        指定编译后的文件的输出目录
    
  - outFile
  
        将所有全局作用域中的代码，合并到同一个文件中，并且module必须是amd或者system规范。
    
  - allowJs
  
        是否对JS文件也进行编译输出到目标文件夹，默认为false
    
  - checkJs

        是否检查JS文件的语法。相当于把对ts的检查，在js文件也进行同样的检查。
    
  - removeComments
  
        是否移除注释
    
  - noEmit

        true，不生成编译后的文件。比如有时候只是想要利用ts做检查，不需要编译，就可以用它。默认为false
    
  - noEmitOnError
  
        有错误时不编译，默认为false。
    
  - alwaysStrict

        设置编译后的文件是否使用严格模式，默认false。
        
        注意，如果我们编写的文件，写了export/import之类的语句，会自动进入严格模式，这个时候就算alwayStrict设置为true，也不会带上"use strict"。
    
  - noImplicitAny
  
        不允许隐式的Any，默认false。
        
        如果设置为true，相当于比较严格，因为如果没有设置变量的类型，默认会是any，这个时候就会报错。
    
  - noImplicitThis

        不允许不明确类型的this，默认false。
  
    ```javascript
    // 设置为true，这个this，需要预先指定好类型
    function foo(this: Window) {
        alert(this)
    }
    ```
    
  - strictNullChecks
  
        严格检查空值，默认false。
  
    ```javascript
    // id="box"的元素有可能不存在，如果strictNullChecks设置为true，则可以提前检查到。
    let box = document.querySelector('#box')
    // 处理方式一：
    if(box !== null) {
        box.addEventListener('click', () => {
            console.log('有#box')
        })
    }
    // 处理方式二：
    box?.addEventListener('click', () => {
    
    })
    ```
    
  - strict
  
    所有严格检查的总开关。默认false。
  
    建议直接打开，报错代码更严谨！



### 三、接口 Interface

```typescript
interface IPerson {
    readonly id: number		// 必填，只读，数字类型
    name: string			// 必填，字符串类型
    age: number				// 必填，数字类型
    sex?: string			// 非必填，字符串类型
}
let person1: IPerson = {
    id: 1,
    name: '张三',
    age: 18,
    // sex: '男'
}

// 函数类型
interface SearchFunc {
  (source: string, subString: string): boolean;
}
let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
  let result = source.search(subString);
  return result > -1;
}
```





### 四、使用webpack打包ts代码



#### 依赖

```shell
npm i -D webpack webpack-cli webpack-dev-server
npm i -D typescript ts-loader
npm i -D html-webpack-plugin clean-webpack-plugin
```



#### 示例

```javascript
const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
    mode: isProduction ? "production" : "development",
    entry: './src/main.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node-modules/
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'ts title',
            template: './src/part3/index.html'
        })
    ],
    // 如果需要import xxx.ts 需要设置引用模块
    resolve: {
        extensions: ['.ts', '.js']
    }
}
```
