'use strict';
/* categoryRoute */
const express = require('express');
const { category_get } = require('../controllers/categoryController');

const router = express.Router();

router.get('/', category_get);

module.exports = router;