'use strict';
const { getHomePictures } = require('../models/homeModel');
const { httpError } = require('../utils/errors');

const home_picture_get = async (req, res, next) => {
  const homePictures = await getHomePictures(next);
  if (homePictures.length === 0) {
    const err = httpError('Categories not found', 404);
    next(err);
    return;
  }
  res.json(homePictures);
};

module.exports = {
  home_picture_get,
}