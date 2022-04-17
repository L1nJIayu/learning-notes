const { Sequelize } = require('sequelize')

const {
    MYSQL_HOST ,
    MYSQL_PORT,
    MYSQL_DB,
    MYSQL_USER,
    MYSQL_PWD
} = require('../config/config.dev')

const seq = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PWD, {
    host: MYSQL_HOST,
    dialect: 'mysql'
})

// 测试连接
// seq.authenticate().then(
//     res => {
//         console.log('数据库连接成功')
//     },
//     err => {
//         console.error(err)
//         console.error('数据库连接失败')
//     }
// )

module.exports = seq