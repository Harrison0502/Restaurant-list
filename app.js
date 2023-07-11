const express = require('express')
const port = 3000
const RestaurantList = require('./models/restaurant')
const restaurant = require('./models/restaurant')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const session = require('express-session')
const routes = require('./routes')
const usePassport = require('./config/passport')
const methodOverride = require('method-override')
const { restart } = require('nodemon')
require('./config/mongoose')


const app = express()



// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars')

app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({
  secret: 'my-secret-key',
  resave: false,
  saveUninitialized: true
}))

usePassport(app)
//將 request 導入路由器
app.use(routes)





app.listen(port, () => {
  console.log('Express is running now')
})
