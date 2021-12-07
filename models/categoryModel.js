'use strict';
const pool = require('../database/db');
const httpError = require('../utils/errors');
const promisePool = pool.promise();

const getAllCategories = async (next) => {
  try {
    const [rows] = await promisePool.execute('SELECT * FROM category');
    return rows;
  } catch (e) {
    console.log('error', e.message);
    const err = httpError('Sql error', 500);
    next(err);
  }
};

module.exports = {
  getAllCategories,
};




