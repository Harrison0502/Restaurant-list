// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const RestaurantList = require('../../models/restaurant')


//定義首頁路由
router.get('/', (req, res) => {
  RestaurantList.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants })) // 將資料傳給 index 樣板
    .catch(error => console.log(error))
})

//搜尋餐廳
router.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase()
  return RestaurantList.find({ name: { $regex: new RegExp(keyword, "i") } })//找尋name 包含keyword的餐廳(不分大小寫)
    .lean()
    .then(restaurants => res.render('index', { restaurants, keyword })) // 將資料傳給 index 樣板
    .catch(error => console.log(error))

})

// 匯出路由模組
module.exports = router