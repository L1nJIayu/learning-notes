
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
// User.sync({ force: true })
module.exports = User