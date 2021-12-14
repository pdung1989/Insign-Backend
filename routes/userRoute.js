'use strict';
/* userRoute */
const express = require('express');
const { body } = require('express-validator');

// multer module to handle multipart/form-data because express does not handle it
const multer = require('multer');

//validate file type with fileFilter
const fileFilter = (req, file, cb) => {
  if (file.mimetype.includes('image')) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
// create upload middleware
const upload = multer({ dest: './uploads/', fileFilter });
const {
  user_get,
  user_list_get,
  user_delete,
  user_update,
  user_update_picture,
  user_get_posts,
  user_get_favorites,
  user_get_list_following,
  user_get_list_follower,
  user_add_following,
  user_delete_following,
  user_get_feed_post,
  checkToken,
} = require('../controllers/userController');

const router = express.Router();

router.route('/')
  .get(user_list_get)
  .put(
    body('username').isLength({ min: 3 }),
    body('password').matches('(?=.*[A-Z]).{8,}'),
    user_update
  );

router.route('/profilePicture')
  .put(upload.single('profile_picture'), user_update_picture);

router.route('/feed').get(user_get_feed_post);

router.route('/following').get(user_get_list_following);

router.route('/following/:followingId')
  .post(user_add_following)
  .delete(user_delete_following);

router.route('/follower')
  .get(user_get_list_follower);

router.route('/:userId')
  .get(user_get)
  .delete(user_delete);

router.get('/:userId/post', user_get_posts);
router.get('/:userId/favorites', user_get_favorites);
router.get('/token', checkToken);

module.exports = router;
