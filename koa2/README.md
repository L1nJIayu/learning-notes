# Koa2笔记





## 一、安装

```shell
npm i koa
```



## 二、基本使用

```javascript
const Koa = require('koa')

const app = new Koa()

app.listen(3000, () => {
    console.log(`server is running: http://localhost:3000`)
})
```





## 三、编写中间件

```javascript
app.use((ctx, next) => {
  ctx.body = 'hello koa'
})
```

在浏览器打开服务地址就可以看到内容了。



## 四、全局配置文件

​	可以在根目录下创建一个`.env`文件，所有的配置都可以直接往这里写，然后借助`dotenv`工具，将这个文件内的所有配置都加载到`process.env`对象中，就可以直接在代码中使用了。

```shell
npm i dotenv
```

**config.js**

```javascript
const dotenv = require('dotenv')
// 调用config方法，可以将.env内的配置，全部加入到process.env对象中作为属性保存
dotenv.config()
// 将process.env导出，方便引入时直接解构取值
module.exports = process.env
```

**app.js**

```javascript
const Koa = require('koa')

const { APP_PORT } = require('./config/config.dev')

const app = new Koa()

app.listen(APP_PORT, () => {
    console.log(`server is running: http://localhost:${ APP_PORT }`)
})
```



## 五、添加路由

​	借助`koa-router`实现。

```shell
npm i koa-router
```

**user.route.js**

```javascript
const Router = require('koa-router')

const router = new Router({ prefix: '/users' })	// prefix可统一配置接口前缀

router.get('/list', ( ctx, next ) => {
    ctx.body = [
        { id: 1, name: '张三' },
        { id: 2, name: '李四' },
        { id: 3, name: '王五' },
    ]
})

module.exports = router
```

**app.js**

```javascript
const Koa = require('koa')

const { APP_PORT } = require('./config/config.dev')
const userRouter = require('./router/user.route')	// 引入users路由

const app = new Koa()

app.use(userRouter.routes())	// 加入中间件

app.listen(APP_PORT, () => {
    console.log(`server is running: http://localhost:${ APP_PORT }`)
})
```





## 六、解析post请求体

​	借助`koa-body`实现

```javascript
npm i koa-body
```

**appjs**

```javascript
const Koa = require('koa')
const KoaBody = require('koa-body')

const userRouter = require('./router/user.route')


const app = new Koa()

app.use(new KoaBody())	// 加入中间件，要放在router之前

app.use(userRouter.routes())


module.exports = app
```

​	使用了这个中间件以后，就可以直接在`ctx.request.body`获得请求体的数据了。如果没有用`koa-body`，则`body`为undefined。





## 七、项目结构

​	为了更好得管理项目代码，我们需要把处理不同内容的代码做出抽离，做各自的统一管理。

```shell
src
├── main.js			# 程序入口
├── app.js 			# koa应用实例
├── config			# 配置
├── router			# 接口路由统一管理
├── controller	# 业务逻辑控制管理
└── service			# 操作数据库管理
```







## 八、操作数据库

​	[sequelize](https://www.sequelize.com.cn/)是一个基于 promise 的 Node.js [ORM](https://en.wikipedia.org/wiki/Object-relational_mapping)，它具有强大的事务支持、关联关系、 预读和延迟加载、读取复制等功能。



### 1.安装

```shell
# 安装Sequelize
npm i sequelize
# 安装mysql数据库驱动（其他数据库的驱动具体去官网找）
npm i mariadb
```



### 2.连接数据库

```javascript
const { Sequelize } = require('sequelize')

const {
    MYSQL_HOST ,
    MYSQL_DB,
    MYSQL_USER,
    MYSQL_PWD
} = require('../config/config.dev')

const seq = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PWD, {
    host: MYSQL_HOST,
    dialect: 'mysql'
})

// 测试连接
seq.authenticate().then(
    res => {
        console.log('数据库连接成功')
    },
    err => {
        console.error(err)
        console.error('数据库连接失败')
    }
)

module.exports = seq
```

**.env**

```shell
MYSQL_HOST = localhost
MYSQL_DB = testDB
MYSQL_USER = root
MYSQL_PWD = 123456
```





### 3.创建模型对象

​	利用我们前面连接数据库时创建的`seq`，使用其`define`方法，即可创建模型对象。

​	模型对象的属性类型，需要使用`DataTypes`的属性进行定义。

```javascript

const { DataTypes } = require('sequelize')

const seq = require('../db/seq')


const User = seq.define('User', {
    username: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
        comment: '用户名'
    },
    password: {
        type: DataTypes.STRING(20),
        allowNull: false,
        comment: '密码'
    },
    email: {
        type: DataTypes.STRING(128),
        allowNull: true,
        comment: '邮箱'
    },
    is_enabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        comment: '可用状态',
        defaultValue: 1
    }
}, {
    tableName: 't_users2'
})
User.sync({ force: true })
module.exports = User
```

- 模型的`sync`方法可以判断数据库中是否存在此表，若不存在，则会创建。

- `force`为true时，不管是否存在此表，都会直接创建最新的。
- 默认会使用`define`的第一个参数加上`s`作为表名。也可自定义，在第三个参数中配置`tableName`即可。
- seq默认会添加`id`、`createdAt`、`updatedAt`三个字段。



### 4.利用模型对象进行CRUD

**添加**

```javascript
const UserModel = require('../models/user.model')
class UserService {
    async addUser(username, password) {
        return await UserModel.create({ username, password })
    }
}

module.exports = new UserService()
```

**查找**

```javascript
const UserModel = require('../models/user.model')
class UserService {
    async getUser(params) {
      return await UserModel.findOne({ where: { ...params }})
    }
}

module.exports = new UserService()
```



**修改**

```javascript
const UserModel = require('../models/user.model')
class UserService {
    
async updateUserById({ id, password, username, email, isEnabled}) {
  const newUser = {
    password,
    username,
    email,
    is_enabled: isEnabled
  }
  return await UserModel.update(newUser, { where: { id } })
}

module.exports = new UserService()

```





## 九、错误处理

​	所有的错误处理最好加上封装，利用emit、on来触发错误和执行错误。

```javascript
async addUser(ctx, next) {
  const { username, password } = ctx.request.body
  try {
    const res = await service.addUser(username, password)
    // 触发成功事件
    ctx.app.emit('successHandler', { ctx, data: res, msg: '用户创建成功' })
  } catch (err) {
    console.error(err)
    // 触发错误事件
    ctx.app.emit('serverErrorHandler', err, ctx)
  }
}
```

**app.js**

```javascript

...

app.on('serverErrorHandler', (err, ctx) => {
    ctx.status = 500
    ctx.body = {
        code: 5000,
        msg: '服务器错误，请联系管理员',
        data: err
    }
})
app.on('successHandler', ({ ctx, data, msg }) =>{
    ctx.body = {
        code: 2000,
        data: data || null,
        msg: msg || '成功',
    }
})

```





## 十、加密

​	`bcryptjs`可以对数据进行加盐加密。

**安装**

```shell
npm i bcryptjs
```

**加密**

```javascript
const bcrypt = require('bcryptjs')

const cryptPassword = async (ctx, next) => {
  	// 获取用户传递的密码
    const { password } = ctx.request.body
		// 加盐
    const salt = bcrypt.genSaltSync(10)
    // 加密
    const hash = bcrypt.hashSync(String(password), salt)
		// 将加盐加密的密码保存到数据库
    ctx.request.body.password = hash

    await next()
}

module.exports = {
    cryptPassword
}
```



**解密**

```javascript
const bcrypt = require('bcryptjs')

async login(ctx, next) {
  try {
    const { username = '', password = '' } = ctx.request.body

    const user_target = await service.getUser({ username })
    // 对比明文的密码和加盐加密的密码，会返回true/false
    const isCorrect = bcrypt.compareSync(String(password), user_target.password)

    if(user_target && isCorrect) {
      ctx.app.emit('successHandler', { ctx, data: null, msg: '登陆成功' })
    } else {
      ctx.app.emit('errorHandler', loginError, ctx)
    }

  } catch(err) {
    console.error(err)
    ctx.app.emit('serverErrorHandler', err, ctx)
  }
}
```





## 十一、令牌Token

JWT（JSON Web Token），三个部分组成：

- header，头部信息
- payload，载荷
- signature，签名，可验证令牌的有效性 

[JSON Web Token 入门教程-阮一峰](https://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html)



生成令牌，可以借助`jsonwebtoken`工具。

**安装**

```shell
npm i jsonwebtoken
```

**生成token**

```javascript
const jwt = require('jsonwebtoken')

const { JWT_SECRET } = require('../config/config.dev')

async login(ctx, next) {
  try {
    const { username = '', password = '' } = ctx.request.body

    const user_target = await service.getUser({ username })

    if(user_target && bcrypt.compareSync(String(password), user_target.password)) {
      const { id, username } = user_target
      const payload = { id, username }
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' })
      ctx.app.emit('successHandler', { ctx, data: { token }, msg: '登陆成功' })
    } else {
      ctx.app.emit('errorHandler', loginError, ctx)
    }


  } catch(err) {
    console.error(err)
    ctx.app.emit('serverErrorHandler', err, ctx)
  }
}
```

**验证token**

```javascript
const jwt = require('jsonwebtoken')
const auth = async (ctx, next) => {
  try {
    // 私钥
    const { JWT_SECRET } = process.env
    // token信息
    const { authorization } = ctx.request.header
    // 将Bearer切割
    const token = authorization.replace('Bearer ', '')
    // 使用token和私钥，以此获取载荷信息
    // 如果token无法使用私钥解析，则会抛出异常，需要在catch中处理
    const payload = jwt.verify(token, JWT_SECRET)
    // 载荷获取成功，保存在ctx.state.user中，使代码可以通过上下文获取当前登录用户的信息
    ctx.state.user = payload
    return await next()
  } catch(err) {
    ctx.body = err
    switch(err.name) {
      case 'TokenExpiredError':
        ctx.body = {
          code: 4000,
          data: null,
          msg: 'Token已过期'
        }
        return
      case 'JsonWebTokenError':
        ctx.body = {
          code: 4000,
          data: null,
          msg: '无效Token'
        }
        return
      default:
        ctx.body = err
        return
    }
  }
}

module.exports = {
  auth
}
```































