const express = require('express')
const app = express()
const port = 3000
const RestaurantList = require('./models/restaurant')//載入restaurant model
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
// 引用 body-parser
const bodyParser = require('body-parser')
// require express-handlebars here
const { restart } = require('nodemon')

// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// 設定連線到 mongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error',()=>{
  console.log('mongodb error!')
})

db.once('open',()=>{
  console.log('mongodb connected!')
})

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars')
// setting static files
app.use(express.static('public'))
// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))

//瀏覽餐廳
app.get('/', (req, res) => {
  RestaurantList.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants })) // 將資料傳給 index 樣板
    .catch(error => console.log(error))
})

//新增頁面
app.get('/restaurants/new',(req,res)=>{
  return res.render('new')
})

//新增餐廳
app.post('/restaurants',(req,res)=>{
   RestaurantList.create(req.body)
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(error => console.log(error))
})

//瀏覽特定餐廳
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return RestaurantList.findById(id)
    .lean()
    .then((restaurant)=> res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

// app.get('/search', (req, res) => {
//   const restaurants = restaurantList.results.filter(restaurant => restaurant.name.toLowerCase().includes(req.query.keyword.toLowerCase()))
//   res.render(`index`, { restaurants, keyword: req.query.keyword })
// })

app.listen(port, () => {
  console.log('Express is running now')
})
