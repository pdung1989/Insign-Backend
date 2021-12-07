'use strict';
/* commentController*/
const { getAllComments, getComment, insertComment, deleteComment, updateComment } = require("../models/commentModel");
const httpError = require('../utils/errors');

// get all comments
const comment_list_get = async (req, res, next) => {
    const comments = await getAllComments(next);
    if(comments.length < 1 ) {
      const err = httpError('Comments not found', 404);
      next(err);
      return;
    } 
    res.json(comments);
};

// get comment by Id
const comment_get = async (req, res, next) => {
  const comment = await getComment(req.params.commentId, next);
  if(!comment) {
    const err = httpError('Comment not found', 404);
    next(err);
    return;
  }
  res.json(comment);
};

// add comment
const comment_post = async (req, res) => {
  const newComment = await insertComment(req.body);
  console.log('add comment data', req.body);
  res.json(newComment);
};

// delete comment
const comment_delete = async (req, res) => {
  const deletedComment = await deleteComment(req.params.commentId);

  res.json({ message: 'comment deleted', deleteComment });
};

// update comment
const comment_update = async (req, res) => {
  const updatedComment= await updateComment(req.params.commentId, req.body);
  res.json({ message: `comment is updated: ${updatedComment}` });
};


module.exports = {
  comment_list_get,
  comment_get,
  comment_post,
  comment_delete,
  comment_update,
}