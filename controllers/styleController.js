'use strict';

const { getAllStyles } = require('../models/styleModel');
const { httpError } = require('../utils/errors');

const style_get = async (req, res, next) => {
  const styles = await getAllStyles(next);
  if (!styles) {
    const err = httpError('Styles not found', 404);
    next(err);
    return;
  }
  res.json(styles);
};

module.exports = {
  style_get,
};
