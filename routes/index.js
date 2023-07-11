const express = require('express')
const router = express.Router()
// 引入 home 模組程式碼
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const users = require('./modules/users')
const { authenticator } = require('../middleware/auth')  


router.use('/users',users)
router.use('/restaurants', authenticator,restaurants)
router.use('/', authenticator, home)



// 匯出路由器
module.exports = router