'use strict';
const { getHomePictures } = require('../models/homeModel');
const { httpError } = require('../utils/errors');

// get 5 pictures of 5 random posts for home page when anynomous user open the website
const home_picture_get = async (req, res, next) => {
  const homePictures = await getHomePictures(next);
  if (!homePictures) {
    const err = httpError('pictures not found', 404);
    next(err);
    return;
  }
  res.json(homePictures);
};

module.exports = {
  home_picture_get,
};
