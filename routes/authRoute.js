'use strict';
const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const {login, user_post, logout} = require('../controllers/authController');
// multer module to handle multipart/form-data because express does not handle it
const multer = require('multer');

//validate file type with fileFilter
const fileFilter = (req, file, cb) => {
  if (file.mimetype.includes('image')) {
    cb(null, true);
  } else {
    cb(null, false);
  }
}
// create upload middleware
const upload = multer({ dest: './uploads/', fileFilter});

router.post('/login', login);
router.get('/logout', logout);
router.post('/register',
    upload.single('profile_picture'),
    body('username').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').matches('(?=.*[A-Z]).{8,}'),
    user_post);

module.exports = router;