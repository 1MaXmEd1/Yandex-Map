const tokenService = require("../service/token-service");

module.exports = function (req, res, next) {
  try {
    const admin = req.headers.authorization;
    if (!admin) {
      return res.status(401).json({ message: "Отсутствует токен авторизации" });
    }

    const accessToken = admin.split(" ")[1];
    if (!accessToken) {
      return res.status(401).json({ message: "Отсутствует токен доступа" });
    }

    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      return res.status(401).json({ message: "Невалидный токен доступа" });
    }

    req.user = userData;
    next();
  } catch (e) {
    console.error(`Ошибка в adminAuth middleware: ${e.message}`);
    return res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
};
