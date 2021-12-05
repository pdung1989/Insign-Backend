'use strict';

const { getAllComments, getComment, insertComment, deleteComment, updateComment } = require("../models/commentModel");

/* commentController*/

// get all comments
const comment_list_get = async (req, res) => {
  try {
    const comments = await getAllComments();
    console.log('all posts', comments);
    res.json(comments); //can use: res.send(posts)
  } catch (error) {
    console.log(error.message);
  }
};

// get comment by Id
const comment_get = async (req, res) => {
  const comment = await getComment(req.params.commentId);
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