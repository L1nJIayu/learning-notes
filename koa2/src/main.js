const app = require('./app')

const { APP_PORT } = require('./config/config.dev')

app.listen(APP_PORT, () => {
    console.log(`server is running: http://localhost:${ APP_PORT }`)
    console.log(`visit userList: http://localhost:${ APP_PORT }/users/list`)
})
