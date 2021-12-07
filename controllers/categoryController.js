'use strict';

const { getAllCategories } = require('../models/categoryModel');
const httpError = require('../utils/errors');

const category_get = async (req, res, next) => {
  const categories = await getAllCategories(next);
  if (categories.length === 0) {
    const err = httpError('Categories not found', 404);
    next(err);
    return;
  }
  res.json(categories);
};

module.exports = {
  category_get,
}