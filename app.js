const express = require('express')
const port = 3000
const RestaurantList = require('./models/restaurant')
const restaurant = require('./models/restaurant')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const routes = require('./routes')
const methodOverride = require('method-override')
const { restart } = require('nodemon')
require('./config/mongoose')


const app = express()



// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars')
// setting static files
app.use(express.static('public'))
// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))
// 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))

//將 request 導入路由器
app.use(routes)





app.listen(port, () => {
  console.log('Express is running now')
})
