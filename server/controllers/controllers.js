const userService = require("../service/user-service.js");
const MarkModel = require("../models/mark-model.js");

class Controllers {
  async registration(req, res) {
    try {
      const { email, password } = req.body;
      const userData = await userService.registration(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      console.log(`Ошибка в запросе регистрации: ${e}`);
    }
  }
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      console.log(`Ошибка в запросе входа: ${e}`);
    }
  }
  async logout(req, res) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json(token);
    } catch (e) {
      console.log(`Ошибка в запросе выхода: ${e}`);
    }
  }
  async refresh(req, res) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      console.log(`Ошибка в запросе ответа: ${e}`);
    }
  }
  async getUsers(req, res) {
    try {
      const users = await userService.getAllUsers();
      return res.json(users);
    } catch (e) {
      console.log(`Ошибка в запросе получения пользователей: ${e}`);
    }
  }
  async createMark(req, res) {
    try {
      const { userId } = req.body;
      const { name, x, y } = req.body.mark;
      const newMark = await MarkModel.create({ userId, name, x, y });
      return res.json(newMark);
    } catch (e) {
      console.error(`Ошибка в запросе создания: ${e}`);
      return res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
  }
  async getMarks(req, res) {
    try {
      const { userId } = req.query;
      const marks = await MarkModel.find({ userId });
      return res.json(marks);
    } catch (e) {
      console.error(`Ошибка в запросе получения: ${e}`);
      return res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
  }
  async updateMark(req, res) {
    try {
      const { mark } = req.body;
      const updatedMark = await MarkModel.findByIdAndUpdate(mark._id, mark, {
        new: true,
      });
      return res.json(updatedMark);
    } catch (e) {
      console.error(`Ошибка в запросе обновления: ${e}`);
      return res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
  }
  async deleteMark(req, res) {
    try {
      const { markId } = req.params;
      await MarkModel.findByIdAndDelete(markId);
      return res.json({ message: "Метка успешно удалена" });
    } catch (e) {
      console.error(`Ошибка в запросе удвления: ${e}`);
      return res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
  }
}

module.exports = new Controllers();
