const UserModel = require('../models/user.model')
class UserService {

    // 插入新的用户数据
    async addUser(username, password) {
        return await UserModel.create({ username, password })
    }

    // 获取某个用户
    async getUser(params) {
        return await UserModel.findOne({ where: { ...params }})
    }

    // 获取用户列表
    async getUserList(params) {
        return await UserModel.findAll()
    }

    // 修改用户信息
    async updateUserById({ id, password, username, email, isEnabled}) {
        const newUser = {
            password,
            username,
            email,
            is_enabled: isEnabled
        }
        return await UserModel.update(newUser, { where: { id } })
    }
}

module.exports = new UserService()