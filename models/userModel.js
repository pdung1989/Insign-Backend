'use strict';
// access database
const pool = require('../database/db');
const promisePool = pool.promise();

// get all users
const getAllUsers = async () => {
  try {
    const [rows] = await promisePool.execute('SELECT * FROM insign_user');
    return rows;
  } catch (error) {
    console.log(error.message);
  }
};

// get user by Id
const getUser = async (userId) => {
  try {
    const [rows] = await promisePool.execute(
      'SELECT * FROM insign_user where user_id = ?',
      [userId]
    );
    return rows[0];
  } catch (error) {
    console.log(error.message);
  }
};

// add new user
const insertUser = async (user) => {
  try {
    const [rows] = await promisePool.execute(
      'INSERT INTO insign_user(username, email, password, profile_picture, bio, role_id) VALUES(?, ?, ?, ?, ?, ?)',
      [user.username, user.email, user.password, user.profile_picture, user.bio || null, user.role_id]
    );
    return rows;
  } catch (error) {
    console.log(error.message);
  }
};

// delete user
const deleteUser = async (userId) => {
  try {
    const [rows] = await promisePool.execute(
      'DELETE FROM insign_user WHERE user_id = ?',
      [userId]
    );
    return rows.affectedRows === 1;
  } catch (error) {
    console.log(error.message);
  }
};

// update user
const updateUser = async (user) => {
  try {
    const [rows] = await promisePool.execute(
      'UPDATE insign_user SET username = ?, email = ?, password = ?, profile_picture = ?, bio= ?, role_id = ? WHERE user_id = ?',
      [user.username, user.email, user.password, user.profile_picture, user.bio || null, user.role_id, user.user_id]
    );
    return rows.affectedRows === 1;
  } catch (e) {
    console.error('model update user', e.message);
  }
};

module.exports = {
  getAllUsers,
  getUser,
  insertUser,
  deleteUser,
  updateUser
};
