const express = require('express')
const router = express.Router()
// 引入 home 模組程式碼
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const users = require('./modules/users')
const auth = require('./modules/auth')
const { authenticator } = require('../middleware/auth')  

router.use('/users',users)
router.use('/restaurants', authenticator,restaurants)
router.use('/auth', auth)
router.use('/', authenticator, home)



// 匯出路由器
module.exports = router