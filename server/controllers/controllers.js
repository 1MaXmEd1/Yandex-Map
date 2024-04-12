const userService = require("../service/user-service.js");

class Controllers {
  async registration(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.registration(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      console.log(`Ошибка в запросе: ${e}`);
    }
  }
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      console.log(`Ошибка в запросе: ${e}`);
    }
  }
  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json(token);
    } catch (e) {
      console.log(`Ошибка в запросе: ${e}`);
    }
  }
  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      console.log(`Ошибка в запросе: ${e}`);
    }
  }
  async getUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();
      return res.json(users);
    } catch (e) {
      console.log(`Ошибка в запросе: ${e}`);
    }
  }
  async createMark(req, res) {
    try {
      const { userId } = req.user;
      const { name, coordinates } = req.body;

      const mark = await MarkModel.create({ userId, name, coordinates });

      return res.json(mark);
    } catch (e) {
      console.error(`Ошибка в запросе: ${e}`);
      return res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
  }
  async getMarks(req, res) {
    try {
      const { userId } = req.user;
      const marks = await MarkModel.find({ userId });
      return res.json(marks);
    } catch (e) {
      console.error(`Ошибка в запросе: ${e}`);
      return res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
  }
  async updateMark(req, res) {
    try {
      const { userId } = req.user;
      const { id } = req.params;
      const { name, coordinates } = req.body;

      const mark = await MarkModel.findByIdAndUpdate(
        id,
        { userId, name, coordinates },
        { new: true }
      );

      return res.json(mark);
    } catch (e) {
      console.error(`Ошибка в запросе: ${e}`);
      return res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
  }
  async deleteMark(req, res) {
    try {
      const { userId } = req.user;
      const { id } = req.params;

      await MarkModel.findByIdAndDelete(id);

      return res.json({ message: "Метка успешно удалена" });
    } catch (e) {
      console.error(`Ошибка в запросе: ${e}`);
      return res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
  }
}

module.exports = new Controllers();
