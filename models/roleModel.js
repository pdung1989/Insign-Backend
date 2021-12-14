'use strict';
const pool = require('../database/db');
const { httpError } = require('../utils/errors');
const promisePool = pool.promise();

// access db to get all role_name with role_id
const getAllRoles = async (next) => {
  try {
    const [rows] = await promisePool.execute('SELECT * FROM role ORDER BY role_id ASC');
    return rows;
  } catch (e) {
    console.log('error', e.message);
    const err = httpError('Sql error', 500);
    next(err);
  }
};

module.exports = {
  getAllRoles,
};