'use strict';
/* commentRoute */
const express = require('express');

const {
  comment_list_get, comment_post, comment_get, comment_update, comment_delete,
} = require('../controllers/commentController');

const router = express.Router();

router.route('/')
  .get(comment_list_get)
  .post(
    body('content').notEmpty(),
    comment_post);

router.route('/:commentId')
  .get(comment_get)
  .put(comment_update)
  .delete(comment_delete);

module.exports = router;