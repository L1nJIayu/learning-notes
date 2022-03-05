// 1、字面量
let gender;
gender = "男";
gender = "女";
let state;
state = 1;
state = '可用';
// 2、any 任意类型，相当于关闭了TS的类型检测
let str_any; // 显示定义
let str_any2; // 也是any，隐式
str_any = 1;
str_any = true;
str_any = "???";
// 3、unknown
let str_unknown;
str_unknown = 1;
str_unknown = true;
// unknown 相当于安全的any，不可以直接赋值给其他类型的变量
let str3;
str3 = str_any; // any 可以直接赋值
// str3 = str_unknown   // unknown 直接赋值会报错
// 如果需要使用known赋值可以加上判断，就不会报错了
if (typeof str_unknown === "string") {
    str3 = str_unknown;
}
// 类型断言也可以解决这个问题，相当于告诉变量，这个 str_unknown 就是一个string
// 有两种方式： 
str3 = str_unknown;
str3 = str_unknown;
// 4、void 表示为空，以函数为例，表示没有返回值的函数
function foo4() {
}
// 5、never 表示永远不会返回结果
function foo5() {
    throw new Error('出错了！');
}
// 6、object 表示一个js对象
let obj6;
obj6 = {};
obj6 = null;
obj6 = function foo6() { };
obj6 = undefined;
obj6 = [];
// {} 可以用来指定对象中允许包含哪些属性
let obj6_1;
obj6_1 = { name: '张三', a: 1 };
// 定义函数
let foo6;
foo6 = function (p6_1, p6_2) {
    return p6_1 + p6_2;
};
// foo6('1',1)  // 会报错
foo6(1, 2);
// 7、array 数组
let arr7_1;
let arr7_2;
arr7_1 = ['1', '2', '3'];
arr7_2 = [1, 2, 3];
// 8、tuple 元组 固定长度、类型的数组
let tuple8;
tuple8 = ['1', 2];
// tuple8 = ['1', '2', '3'] // 报错
// tuple8 = [1, 2] // 报错
// 9、enum 枚举
var Gender;
(function (Gender) {
    Gender[Gender["Male"] = 1] = "Male";
    Gender[Gender["Female"] = 2] = "Female";
})(Gender || (Gender = {}));
let obj9;
obj9 = {
    name: '张三',
    gender: Gender.Male
};
// & 表示 同时， | 表示 或者
let o9_1;
let o9_2;
o9_1 = {
    name: '张三',
    age: 1
};
o9_2 = {
    age: 1
};
let a;
let b;
let c;
a = 1;
b = 3;
c = 5;
// c = 6    // 报错
