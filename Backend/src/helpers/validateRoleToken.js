const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const { keyToken } = require("../config");

module.exports = (req = request, res = response) => {
  const access_token = req.headers['access-token'];
  console.log(access_token)
  console.log(req.headers)
  if (!access_token) {
    throw new Error('No se envio el token');
  }

  const data = jwt.verify(access_token, keyToken);

  const { role } = data;

  if (role !== "admin") {
    return true;
  } else {
    return false;
  }
};