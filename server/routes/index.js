const router = require('express').Router();
const user = require('./user');
const dataSaham = require('./dataSaham');

router.use('/user', user);
router.use('/data-saham', dataSaham);

module.exports = router;