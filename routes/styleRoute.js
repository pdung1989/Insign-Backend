'use strict';
/* styleRoute */
const express = require('express');
const { style_get } = require('../controllers/styleController');

const router = express.Router();

router.get('/', style_get);

module.exports = router;