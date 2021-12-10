/* commentModel TO HANDLE comment DATA */
'use strict';
const pool = require('../database/db');
const httpError = require('../utils/errors');
const promisePool = pool.promise();

// use async/await to handle fetching data
// get all comments
const getAllComments = async (next) => {
  try {
    const [rows] = await promisePool.execute('SELECT * FROM comment');
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
const insertComment = async (comment, next) => {
  try {
    const [rows] = await promisePool.execute(
      'INSERT INTO comment(user_id, post_id, content) VALUES (?, ?, ?)',
      [comment.user_id, comment.post_id, comment.content]
    );
    return rows;
  } catch (e) {
    console.log('error', e.message);
    const err = httpError('Sql error', 500);
    next(err);
  }
};

const deleteComment = async (commentId, user_id, role_id) => {
  let sql = 'DELETE FROM comment WHERE comment_id = ? AND user_id = ?';
  let params = [commentId, user_id];
  // admin can delete post
  if (role_id === 0) {
    (sql = 'DELETE FROM comment WHERE comment_id = ?'), (params = [commentId]);
  }
  try {
    const [rows] = await promisePool.execute(sql, params);
    console.log('model delete comment', rows);
    return rows.affectedRows === 1;
  } catch (e) {
    console.log('error', e.message);
  }
};

// update comment and update also edited_date with current timestamp
const updateComment = async (comment) => {
  let sql = 'UPDATE comment SET content = ?, edited_date = CURRENT_TIMESTAMP WHERE comment_id = ? AND user_id = ?';
  let params = [comment.content, comment.comment_id, comment.user_id]
  try {
    const [rows] = await promisePool.execute(sql, params);

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
