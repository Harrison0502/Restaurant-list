const express = require('express')
const router = express.Router()
const User =require('../../models/user')
const passport = require('passport')

router.get('/login', (req, res) => {
  const userInput = req.session.userInput || {}
  delete req.session.userInput
  res.render('login', { email: userInput.email, password: userInput.password })
})

router.post('/login', (req, res, next) => {
  const email = req.body.email
  const password = req.body.password

  req.session.userInput = { email, password } // 存儲使用者輸入的值
  next()
}, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/register',(req,res)=>{
  res.render('register')
})

router.post('/register',(req,res)=>{
  const {name,email,password,confirmPassword}=req.body
  const errors = []
  if ( !email || !password || !confirmPassword) {
    errors.push({ message: 'Name以外的所有欄位都是必填。' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符！' })
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }
  User.findOne({ email }).then(user => {
    if (user) {
      errors.push({ message: '用戶已經註冊過了' })
      return res.render('register', {
        errors,
        name,
        email,
        password,
        confirmPassword,
        userExists: true
      })
    } else{
      return User.create({
        name,
        email,
        password
      })
       .then(() => res.redirect('/'))
       .catch(err => console.log(err))
    }
  })
  .catch(err => console.log(err))
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已經成功登出。')
  res.redirect('/users/login')
})

module.exports = router
