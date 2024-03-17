const Router = require('express')
const router = new Router()
const DidgitalSystemRouter = require('./DidgitalSystemRouter')
const monitorRouter = require('./monitorRouter')

router.use('/didgital', DidgitalSystemRouter)
router.use('/monitor', monitorRouter)

module.exports = router
