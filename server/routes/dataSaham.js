const router = require('express').Router();
const DataSahamController = require('../controllers/dataSahamController');
const isDataSahamExist = require('../middlewares/isDataSahamExist');
const authentication = require('../middlewares/authentication');

router.use(authentication);
router.get('/', DataSahamController.listDataSaham);
router.post('/', DataSahamController.createDataSaham);
router.get('/:id', isDataSahamExist, DataSahamController.dataSaham);
router.put('/:id', isDataSahamExist, DataSahamController.updateDataSaham);
router.delete('/:id', isDataSahamExist, DataSahamController.deleteDataSaham);
router.post('/multiple/create', DataSahamController.multipleCreateDataSaham);
router.delete('/multiple/delete', DataSahamController.deleteAllData);
router.get('/all/data', DataSahamController.getAllDataSaham);

module.exports = router;