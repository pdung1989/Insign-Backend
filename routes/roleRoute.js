'use strict';
/* roleRoute */
const express = require('express');
const { role_get } = require('../controllers/roleController');

const router = express.Router();

router.get('/', role_get);

module.exports = router;