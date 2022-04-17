const UserModel = require('../models/user.model')
class UserService {
    async addUser(username, password) {
        return await UserModel.create({ username, password })
    }
    async getUser(params) {
        return await UserModel.findOne({ where: { ...params }})
    }
    async getUserList(params) {
        return await UserModel.findAll()
    }
    async updateUserById({ id, password, username, email, isEnabled}) {
        return await UserModel.update({ password, username, email, is_enabled: isEnabled }, { where: { id }})
    }
}

module.exports = new UserService()