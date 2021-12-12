'use strict';
/* commentController*/
const { validationResult } = require('express-validator');
const {
  getAllComments,
  getComment,
  insertComment,
  deleteComment,
  updateComment,
} = require('../models/commentModel');
const { httpError } = require('../utils/errors');

// get all comments
const comment_list_get = async (req, res, next) => {
  const comments = await getAllComments(next);
  if (comments.length === 0) {
    const err = httpError('Comments not found', 404);
    next(err);
    return;
  }
  res.json(comments);
};

// get comment by Id
const comment_get = async (req, res, next) => {
  const comment = await getComment(req.params.commentId, next);
  if (!comment) {
    const err = httpError('Comment not found', 404);
    next(err);
    return;
  }
  res.json(comment);
};

// add comment
const comment_post = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.error('comment_post validation', errors.array());
    const err = httpError('data not valid', 400);
    next(err);
    return;
  }
  req.body.user_id = req.user.user_id;
  const newComment = await insertComment(req.body);
  console.log('add comment data', req.body);
  res.json(newComment);
};

// delete comment
const comment_delete = async (req, res, next) => {
  const deletedComment = await deleteComment(
    req.params.commentId,
    req.user.user_id,
    req.user.role_id,
    next
  );
  if(deletedComment) {
    res.json({ message: 'comment deleted'});
    return;
  }
  const err = httpError('delete comment: unauthorized', 401);
  next(err);
};

// update comment
const comment_update = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.error('comment_post validation', errors.array());
    const err = httpError('data not valid', 400);
    next(err);
    return;
  }

  req.body.comment_id = req.params.commentId;
  req.body.user_id = req.body.user_id || req.user.user_id;
  const updatedComment = await updateComment(req.body);
  res.json({ message: `comment is updated: ${updatedComment}` });
};

module.exports = {
  comment_list_get,
  comment_get,
  comment_post,
  comment_delete,
  comment_update,
};
