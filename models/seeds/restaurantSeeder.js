const mongoose = require('mongoose')
const Restaurant = require("../restaurant")
const restaurantsSeeds = require('../../restaurant.json').results

const db=mongoose.connection

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// 設定連線到 mongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
  Restaurant.create(restaurantsSeeds)
    .then(() => {
      console.log("restaurantSeeder done!")
      db.close()
    })
    .catch(err => console.log(err))
})