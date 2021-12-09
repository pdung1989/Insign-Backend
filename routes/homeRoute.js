'use strict';
/* homeRoute */
const express = require('express');
const { home_picture_get } = require('../controllers/homeController');

const router = express.Router();

router.get('/', home_picture_get);

module.exports = router;