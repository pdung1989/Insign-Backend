'use strict';

const { getAllRoles } = require('../models/roleModel');
const { httpError } = require('../utils/errors');

const role_get = async (req, res, next) => {
  const roles = await getAllRoles(next);
  if (roles.length === 0) {
    const err = httpError('roles not found', 404);
    next(err);
    return;
  }
  res.json(roles);
};

module.exports = {
  role_get,
};