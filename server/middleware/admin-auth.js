const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Пользователь не авторизован" });
    }

    const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    if (userData._isAdmin == false) {
      return res.status(403).json({ message: "Недостаточно прав" });
    }
    
    next();
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Ошибка сервера" });
  }
};
