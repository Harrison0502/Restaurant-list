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
  const sortBy=req.query.sortBy
  let sortName=''
  let sortObject={}
  if (sortBy === 'az') {
    sortObject.name = 'asc'
    sortName="A->Z"
  } else if (sortBy === 'za') {
    sortObject.name = 'desc'
    sortName = "Z->A"
  } else if (sortBy === 'category') {
    sortName = "類別"
  } else if (sortBy === 'location') {
    sortObject.location = 'asc'
    sortName = "地區"
  } else if (sortBy === 'rating') {
    sortObject.rating = -1//降冪，由高到低
    sortName = "評分"
  }
  return RestaurantList.find({ name: { $regex: new RegExp(keyword, "i") } })//找尋name 包含keyword的餐廳(不分大小寫)
    .lean()
    .sort(sortObject)
    .then(restaurants => res.render('index', { restaurants , keyword , sortName})) // 將資料傳給 index 樣板
    .catch(error => console.log(error))

})

// 匯出路由模組
module.exports = router