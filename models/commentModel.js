/* commentModel TO HANDLE comment DATA */
'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

// use async/await to handle fetching data
// get all comments
const getAllComments = async () => {
  try {
    const [rows] = await promisePool.execute(
      'SELECT * FROM comment'
    );
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
};

// get comment by Id
const getComment = async (commentId) => {
  try {
    const [rows] = await promisePool.execute(
      'SELECT * FROM comment WHERE comment_id = ?',
      [commentId]
    );
    return rows[0];
  } catch (e) {
    console.log('error', e.message);
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

const updateComment = async (commentId, comment) => {
  try {
    const [rows] = await promisePool.execute(
      'UPDATE comment SET user_id = ?, post_id = ?, content = ? WHERE comment_id = ?',
      [
        comment.user_id,
        comment.post_id,
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