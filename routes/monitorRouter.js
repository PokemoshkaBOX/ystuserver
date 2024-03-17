const Router = require('express')
const router = new Router()
const DidgitalSystemController = require("../controllers/monitorController");
//импортируем контроллер

router.get('/', DidgitalSystemController.getMonitorZach)
router.get('/students/', DidgitalSystemController.getStudents)
router.get('/rf/', DidgitalSystemController.getRF)
router.get('/notrf/', DidgitalSystemController.getNotRF)
router.get('/all/', DidgitalSystemController.getAll)
router.get('/appsub/', DidgitalSystemController.getAppSub)
router.get('/appcount/', DidgitalSystemController.getApplicationsCountByDate)
router.get('/table/', DidgitalSystemController.getTable)
router.get('/part/', DidgitalSystemController.getPart)
router.get('/formstud/', DidgitalSystemController.getStud)
router.get('/fin/', DidgitalSystemController.getFin)
router.get('/obl/', DidgitalSystemController.getObl)
router.get('/chan/', DidgitalSystemController.getChan)
router.get('/avg/', DidgitalSystemController.getAvgBall)
router.get('/orig/', DidgitalSystemController.getOrig)

module.exports = router