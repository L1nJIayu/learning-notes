# React

React学习笔记



## 一、代码



- [01-helloworld](./src/01-helloworld/01-helloworld.html)
- [02-JSX语法](./src/02-JSX语法/02-JSX语法.html)
- [03-函数式组件](./src/03-函数式组件/03-函数式组件.html)
- [04-类式组件](./src/04-类式组件/04-类式组件.html)
- 05-有状态的组件
  - [05-1-有状态的组件-state](./src/05-有状态的组件-state/05-1-有状态的组件-state.html)
  - [05-2-有状态的组件-简化代码](./src/05-有状态的组件-state/05-2-有状态的组件-简化代码.html)
- 06-props
  - [06-props-类式组件](./src/06-props/06-props-类式组件.html)
  - [06-props-函数式组件](./src/06-props/06-props-函数式组件.html)
- 07-refs
  - [07-1-refs-字符串形式](./src/07-refs/07-1-refs-字符串形式.html)
  - [07-2-refs-回调函数形式](./src/07-refs/07-2-refs-回调函数形式.html)
  - [07-3-refs-createRef](./src/07-refs/07-3-refs-createRef.html)
- [08-表单数据获取](./src/08-表单数据获取/08-表单数据获取.html)
- 09-生命周期
  - [09-生命周期-旧](./src/09-生命周期/09-生命周期-旧.html)
- 



## 二、笔记





### 虚拟DOM

React内部提供了API`createElement()`可以创建虚拟DOM。

虚拟DOM是React内部用的DOM，本质是一个对象，且没有原生DOM那么多属性，React最终会将虚拟DOM转化为真实的DOM。

JSX相当于一个创建虚拟DOM的语法糖，可通过babel翻译。



### JSX语法规则

1. 只有一个root节点

2. 标签中混入【JS表达式】时需要用{}
3. 指定class样式类时，需要用className指定

4. 内联样式需要用style={{ ... }}形式去写，相当于写一个对象表达式
5. 标签必须闭合，否则会报错

6. 标签的首字母
   1. 小写开头：会直接作为标签渲染，但如果该标签不属于html规范的标签，控制台会报错。
   2. 大写开头：会认为是一个React组件。

7. 不允许将对象类型的变量作为表达式直接写在VDOM中，会报错，数组可以，React会直接遍历输出。但是数组元素不允许为对象类型，否则同样会报错。



### React组件类型

- 函数式组件
  1. 在babel翻译后的JSX，会使用严格模式"use strict"，此时，函数内部的this就不再指向window对象，而是一个undefined。
  2. <MyComponent />必须使用大写字母开头，否则会被认为是html标签直接渲染到页面，同时也会报错，提示不是标准的html标签。



- 类式组件
  1. 类式组件必须继承React.Component
  2. 必须有render，且有返回值
  3. render中的this，指向的就是该类的实例。因为React内部在发现该组件是一个类时，就会new一个该类的实例，且调用该实例的render函数。
  4. 类中所有定义的方法，内部都开启了严格模式，所以如果在MyComponent中自定义其他函数，内部的this都是undefined。



### 组件的状态 - state

1. hooks出现之前，只有类式组件能支持状态
2. 状态要么在构造器contructor中初始化，要么直接作为类的实例属性进行设置。
3. 状态中的数据不允许直接更改，需要使用setState。更新是一种合并，而不是直接替换
4. 状态更新几次，render就调用几次。



### props

	1. 函数式组件和类式组件都可以接收props，函数式组件的第一个参数作为props，类式组件则通过实例的属性`this.props`获取。
	1. props是只读的。
	1. 接收props时，可以定义类型验证`propTypes`，在16.x版本之后，propTypes就不放在React核心库中的，需要另外单独引入。
	1. 对于函数式组件，propTypes需要定义在函数的原型对象上（Person.propTypes = {...}）；而对于类似组件，则需要定义为类的属性（使用`static`进行设置）





### refs的三种用法

 1. 字符串形式

    `ref="myRef"`

    这种写法是最简单的，但是由于存在某些效率问题，官方已经不推荐这么写了，并且已经表示在未来版本可能删除此写法。

 2. 回调函数形式

    `ref="(e) => { this.myRef = e }"`

    回调函数的第一个参数会返回真实的DOM元素。

    如果以内联的实现写，此函数在每次更新时都会被调用两次，主要是React为了旧内容能被准确清空，所以第一次传递的element为null，第二次传递的才是正确的DOM。

    以绑定函数的形式写可以解决此问题，但是内联的形式写，问题也不大。

    

 3. createRefs

    `myRef=React.createRefs()`

    这个ref只能一个元素用，如果有多个，则需要多次调用`creatRefs()`。

    真实DOM需要用`myRefs.current`获取



### 事件

​	对于事件的绑定，需要直接绑定一个函数。利用高阶函数以及函数柯里化可以解决函数的传参问题。



### 生命周期（旧 16.3）

![生命周期-旧 16.3](./readme-imgs/react生命周期(旧).png)

- 挂载：调用ReactDOM.render()
  1. constructor
  2. componentWillMount
  3. render
  4. componentDidMount

- 状态更新：调用this.setState
  1. shouldComponentUpdate
  2. componentWillUpdate
  3. render
  4. componentDidUpdate

- 强制更新：调用this.forceUpdate
  1. componentWillUpdate
  2. render
  3. componentDidUpdate

- 卸载：调用ReactDOM.unmountComponentAtNode
  1. componentWillUnmount

- 父子组件之间：若父组件调用了render，子组件会发生
  1. componentWillReceiveProps(props)  (第一次传不算)
  2. shouldComponentUpdate
  3. componentWillUpdate
  4. render
  5. componentDidUpdate

  

### 生命周期（新-17.x）

![生命周期-旧 16.3](./readme-imgs/react生命周期(新).png)

- 变动：

  1. 有三个钩子改名了，都需要在前面加上`UNSAFE_`

     `componentWillMount`、`componentWillUpdate`、`componentWillReceiveProps`

     [原因](https://react.docschina.org/blog/2018/03/27/update-on-async-rendering.html)

  2. 新增钩子`getDerivedStateFromProps`

     使用这个钩子需要用static，不可以作为实例的方法，且必须返回状态对象，或者null。

     这个钩子几乎不会用到，仅在state在任何时候都取决于props时，才可以使用。

  3. 新增钩子`getSnapshotBeforeUpdate`

     在更新之前获取快照，用得比较少。

  



### react脚手架

```shell
# 全局安装react脚手架的库
npm i -g create-react-app

# 创建一个以脚手架为模版的react项目
create-react-app hello-react
```



```react
// React.StrictMode可以帮助检查语法
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
```





### 代理配置

- 方法一：在`package.json`中配置

  1. 优点：配置简单，前端请求资源时可以不加任何前缀。
  2. 缺点：不能配置多个代理。
  3. 工作方式：上述方式配置代理，当请求了本地不存在的资源时，那么该请求会转发给代理指定的url去请求资源 （优先匹配前端资源）

- 方法二：在`src/setupProxy.js`中配置

  1. 第一步：创建代理配置文件

     ```
     在src下创建配置文件：src/setupProxy.js
     ```


  2. 编写setupProxy.js配置具体代理规则：

  ```js
  const proxy = require('http-proxy-middleware')
  
  module.exports = function(app) {
    app.use(
      proxy('/api1', {  //api1是需要转发的请求(所有带有/api1前缀的请求都会转发给5000)
        target: 'http://localhost:5000', //配置转发目标地址(能返回数据的服务器地址)
        changeOrigin: true, //控制服务器接收到的请求头中host字段的值
        /*
        	changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000
        	changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:3000
        	changeOrigin默认值为false，但我们一般将changeOrigin值设为true
        */
        pathRewrite: {'^/api1': ''} //去除请求前缀，保证交给后台服务器的是正常请求地址(必须配置)
      }),
      proxy('/api2', { 
        target: 'http://localhost:5001',
        changeOrigin: true,
        pathRewrite: {'^/api2': ''}
      })
    )
  }
  ```

说明：

1. 优点：可以配置多个代理，可以灵活的控制请求是否走代理。
2. 缺点：配置繁琐，前端请求资源时必须加前缀。





### 消息发布与订阅（[PubSub](https://github.com/mroderick/PubSubJS)）

​	可解决非父子组件之间无法通信的问题。

```shell
npm install pubsub-js
```

```javascript
import PubSub from 'pubsub-js'

// create a function to subscribe to topics
var mySubscriber = function (msg, data) {
    console.log( msg, data );
};

// add the function to the list of subscribers for a particular topic
// we're keeping the returned token, in order to be able to unsubscribe
// from the topic later on
var token = PubSub.subscribe('MY TOPIC', mySubscriber);

// publish a topic asynchronously
PubSub.publish('MY TOPIC', 'hello world!');

// publish a topic synchronously, which is faster in some environments,
// but will get confusing when one topic triggers new topics in the
// same execution chain
// USE WITH CAUTION, HERE BE DRAGONS!!!
PubSub.publishSync('MY TOPIC', 'hello world!');
```





### 对SPA的理解（Single Page Web Application）

​	整个应用只有一个完整的页面；

​	点击链接时，页面不会通过刷新去更新页面，而是根据***路由***切换需要显示的组件，只做局部的更新，以此达到更换页面内容的目的。

​	数据需要通过xhr/fetch来请求服务器返回数据。



### 路由 Route

​	前端路由的实现，一种是靠浏览器的BOM中的history实现的；另一种是使用hash实现。

#### react-router-dom@5

```shell
npm i react-router-dom@5
```

##### 基本使用

```jsx
import { BrowserRouter, Link, Route } from 'react-router-dom';

import About from './pages/About/About';
import Home from './pages/Home/Home';

<BrowserRouter>
  <Link to="/about">About</Link> / 
  <Link to="/home">Home</Link>

  <Route path="/about" component={ About }></Route>
  <Route path="/home" component={ Home }></Route>
</BrowserRouter>
```

注意：`<Route>`中的component，会默认传递三个固定属性，放在props中

- **history**:

- 1. **go**: *ƒ go(n)*
  2. **goBack**: *ƒ goBack()*
  3. **goForward**: *ƒ goForward()
  4. **push**: *ƒ push(path, state)*
  5. **replace**: *ƒ replace(path, state)

- **location**:

- 1. **pathname**: "/about"
  2. **search**: ""
  3. **state**: undefined

- **match**:

- 1. **params**: {}
  2. **path**: "/about"
  3. **url**: "/about"



##### 内置组件

1. <BrowserRouter>

2. <HashRouter> 哈希路由

3. <Route> 匹配路由，显示此内容
   1. exact，默认false，模糊匹配；true==>精准匹配，路由一摸一样才匹配成功。

4. <Redirect> 重定向

5. <Link> 设置路由
   1. to，调整的路由

6. <NavLink> 解决高亮问题
   1. activeClassName，指定高亮时得到的className

7. <Switch> 解决效率问题，匹配到了就别往下执行了



##### 路由组件传参

1. params

   ```jsx
   // 传参
   <Link to={`/about/message/detail/${ item.id }`}>{ item.title }</Link>
   
   // 路由
   <Route path="/about/message/detail/:id" component={ Detail }></Route>
   
   // 接收
   this.props.match.params	// {id:1}
   ```

2. search

   ```jsx
   // 传参
   <Link to={`/about/message/detail?id=${ item.id }`}>{ item.title }</Link>
   
   // 路由
   <Route path="/about/message/detail" component={ Detail }></Route>
   
   // 接收
   this.props.location.search	// ?id=1
   ```

3. state

   ```jsx
   // 传参
   <Link to={{pathname: '/about/message/detail', state: { id: item.id }}}>{ item.title }</Link>
   
   // 路由
   <Route path="/about/message/detail" component={ Detail }></Route>
   
   // 接收
   this.props.location.state
   ```



##### 编程式路由

​	利用`this.props.history`中提供的方法可以实现。

1. params

   ```jsx
   // 传参
   this.props.history.push(`/about/message/detail/${item.id}`);
   
   // 路由
   <Route path="/about/message/detail/:id" component={ Detail }></Route>
   
   // 接收
   this.props.match.params;	// {id:1}
   ```

2. search

   ```jsx
   // 传参
   this.props.history.push(`/about/message/detail?id=${ item.id }`);
   
   // 路由
   <Route path="/about/message/detail" component={ Detail }></Route>
   
   // 接收
   this.props.location.search;	// ?id=1

3. state

   ```jsx
   // 传参
   this.props.history.push('/about/message/detail', { id: item.id });
   
   // 路由
   <Route path="/about/message/detail" component={ Detail }></Route>
   
   // 接收
   this.props.location.state;
   ```

注意：只有路由组件在`this.props`中才有`histroy`属性，对于一般组件，要解决这个问题，需要引入`withRouter`配合使用，组件才能使用`this.props.history`

```jsx
// 已省略无关代码
import { widthRouter } from 'react-router-dom'

class Header extends Component {
  ...
}

export default widthRouter(Header)
```



##### Browser和Hash的区别

1. 底层原理不同

   Browser借助底层history API实现，H5开始支持，IE9以下的版本会出问题；

   Hash借助URL的哈希值实现。

2. 路径表现形式不同

   Browser好看一些，Hash后面会带一个`#`号

3. 刷新后，对于state的传参形式影响不同

   Browser刷新后没有任何影响，state会保存在history中；

   Hash刷新后，state会丢失，因为底层不是用history实现的。

4. Hash可以解决一些资源路径获取出现404的问题







