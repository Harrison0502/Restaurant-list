const Restaurant = require("../restaurant")
const restaurantsSeeds = require('../../restaurant.json').results

const db = require('../../config/mongoose')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

db.once('open', () => {
  Restaurant.create(restaurantsSeeds)
    .then(() => {
      console.log("restaurantSeeder done!")
      db.close()
    })
    .catch(err => console.log(err))
})