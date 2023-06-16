const express = require('express')
const router = express.Router()
// 引入 home 模組程式碼
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')

// request 導向模組 
router.use('/', home)
router.use('/restaurants',restaurants)



// 匯出路由器
module.exports = router