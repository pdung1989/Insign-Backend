/* commentModel TO HANDLE comment DATA */
'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

// use async/await to handle fetching data
// get all comments
const getAllComments = async (next) => {
  try {
    const [rows] = await promisePool.execute(
      'SELECT * FROM comment'
    );
    return rows;
  } catch (e) {
    console.log('error', e.message);
    const err = httpError('Sql error', 500);
    next(err);
  }
};

// get comment by Id
const getComment = async (commentId, next) => {
  try {
    const [rows] = await promisePool.execute(
      'SELECT * FROM comment WHERE comment_id = ?',
      [commentId]
    );
    return rows[0];
  } catch (e) {
    console.log('error', e.message);
    const err = httpError('Sql error', 500);
    next(err);
  }
};

// add comment
const insertComment = async (comment) => {
  try {
    const [rows] = await promisePool.execute(
      'INSERT INTO comment(user_id, post_id, content) VALUES (?, ?, ?)',
      [comment.user_id, comment.post_id, comment.content]
    );
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
};

const deleteComment = async (commentId) => {
  try {
    const [rows] = await promisePool.execute(
      'DELETE FROM comment WHERE comment_id = ?',
      [commentId]
    );
    console.log('model delete comment', rows);
    return rows.affectedRows === 1;
  } catch (e) {
    console.log('error', e.message);
  }
};

// update comment and update also edited_date with current timestamp
const updateComment = async (commentId, comment) => {
  try {
    const [rows] = await promisePool.execute(
      'UPDATE comment SET content = ?, edited_date = CURRENT_TIMESTAMP WHERE comment_id = ?',
      [
        comment.content,
        commentId,
      ]
    );
    return rows.affectedRows === 1;
  } catch (e) {
    console.log('error', e.message);
  }
};


module.exports = {
  getAllComments,
  getComment,
  insertComment,
  deleteComment,
  updateComment,
};