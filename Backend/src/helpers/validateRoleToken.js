const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const { keyToken } = require("../config");

module.exports = (req = request, res = response) => {
  const access_token = req.headers['access-token'];

  if (!access_token) {
    return res.status(400).send("No se ha enviado el token");
  }

  const data = jwt.verify(access_token, keyToken);

  const { role } = data;

  if (role !== "admin") {
    return true;
  } else {
    return false;
  }
};