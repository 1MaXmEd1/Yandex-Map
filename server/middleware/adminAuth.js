const jwt = require("jsonwebtoken");
const ApiError = require("../exceptions/apiError");

module.exports = function (req, res, next) {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return ApiError.Unauthorized("Вы не авторизованы");
  }

  const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

  if (userData._isAdmin == false) {
    return ApiError.Forbidden("Недостаточно прав");
  }

  next();
};
