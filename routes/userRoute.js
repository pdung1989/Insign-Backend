'use strict';
/* userRoute */
const express = require('express');
const { body } = require('express-validator');

// multer module to handle multipart/form-data because express does not handle it
const multer = require('multer');

//validate file type with fileFilter
const fileFilter = (req, file, cb) => {
  if (file.mimetype.includes('profile_picture')) {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

// create upload middleware
const upload = multer({ dest: './uploads/', fileFilter});

const {
  user_get,
  user_list_get,
  user_post,
  user_delete,
  user_update,
  user_get_posts,
  user_get_favorites,
  // user_post_favorites,
  // user_delete_favorites,
  checkToken,
} = require('../controllers/userController');

const router = express.Router();

router.route('/')
  .get(user_list_get)
  .post(
    upload.single('user'),
    body('username').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').matches('(?=.*[A-Z]).{8,}'),
    user_post)
 ;

router.route('/:userId')
  .get(user_get)
  .delete(user_delete)
  .put(
    upload.single('user'),
    body('username').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').matches('(?=.*[A-Z]).{8,}'),
    user_update);

router.get('/:userId/post', user_get_posts);
router.route('/:userId/favorites')
  .get(user_get_favorites);
  // .post(user_post_favorites)
  // .delete(user_delete_favorites);
router.get('/token', checkToken);

module.exports = router;
