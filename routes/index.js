const {Router} = require('express')
const router = Router()
router.use('/',require('./routes'))
module.exports = router