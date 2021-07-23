const router = require('express').Router()

const user = require('./routes/userRoute')

router.use('/user', user)

module.exports = router;
