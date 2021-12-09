'use strict';
const pool = require('../database/db');
const { httpError } = require('../utils/errors');
const promisePool = pool.promise();

const getHomePictures = async (req, next) => {
  try {
    const [rows] = await promisePool.execute('SELECT title, image FROM post ORDER BY RAND () LIMIT 5');
    return rows;
  } catch (error) {
    console.log(error.message);
    const err = httpError('Sql error', 500);
    next(err);
  }
};

module.exports = {
  getHomePictures,
};
