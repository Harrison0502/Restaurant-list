const express = require('express')
const router = express.Router()

const RestaurantList = require('../../models/restaurant')

//新增頁面
router.get('/new', (req, res) => {
  return res.render('new')
})

//新增餐廳
router.put('', (req, res) => {
  const userId = req.user._id
  RestaurantList.create({ ...req.body, userId })
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(error => console.log(error))
})

//瀏覽特定餐廳
router.get('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  return RestaurantList.findOne({ _id, userId })
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

//修改餐廳頁面
router.get('/:id/edit', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  return RestaurantList.findOne({ _id, userId })
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})


//修改餐廳資料
router.put('/:id/edit', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  const updateData = req.body
  RestaurantList.findOneAndUpdate({ _id,userId }, updateData)
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(error => console.log(error))
})

//刪除餐廳
router.delete('/:id/delete', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  return RestaurantList.findOne({ _id, userId })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/')) // 刪除後導回首頁
    .catch(error => console.log(error))
})

module.exports = router