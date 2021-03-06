'use strict';
const pool = require('../database/db');
const { httpError } = require('../utils/errors');
const promisePool = pool.promise();

// access db to get all styles
const getAllStyles = async (next) => {
  try {
    const [rows] = await promisePool.execute('SELECT * FROM style ORDER BY style_id DESC');
    return rows;
  } catch (e) {
    console.log('error', e.message);
    const err = httpError('Sql error', 500);
    next(err);
  }
};

module.exports = {
  getAllStyles,
};