const Restaurant = require("../restaurant");
const restaurantsSeeds = require('./restaurant.json').results;
const db = require('../../config/mongoose');
const bcrypt = require("bcryptjs");
const User = require('../user');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const SEED_USERS = [
  {
    name: "user1",
    email: "user1@example.com",
    password: "12345678",
    restaurantIndex: [0, 1, 2],
  },
  {
    name: "user2",
    email: "user2@example.com",
    password: "12345678",
    restaurantIndex: [3, 4, 5],
  },
];

db.once('open', () => {
  return Promise.all(SEED_USERS.map((user) => {
    const { name, email, password, restaurantIndex } = user
    return bcrypt
      .genSalt(10)
      .then((salt) => bcrypt.hash(user.password, salt))
      .then((hash) =>
        User.create({
          name: user.name,
          email: user.email,
          password: hash,
        })
      )
      .then((createdUser) => {
        const userId = createdUser._id;
        const restaurants =user.restaurantIndex.map((index) => {
          return { ...restaurantsSeeds[index], userId };
        });
        return Restaurant.create(restaurants);
      });
  }))
    .then(() => {
      console.log("User and Restaurant seeder done!");
      process.exit();
    })
    .catch((error) => console.log(error));
});
