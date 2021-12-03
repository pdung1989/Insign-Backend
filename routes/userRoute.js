'use strict';
/* userRoute */
const express = require('express');
const { user_get, user_list_get, user_post, user_delete, user_update, user_get_posts } = require('../controllers/userController');
const router = express.Router(); 

router.route('/')
  .get(user_list_get)
  .post(user_post)
  .put(user_update)

router.route('/:userId')
  .get(user_get)
  .delete(user_delete)

router.get('/:userId/post', user_get_posts);

module.exports = router;