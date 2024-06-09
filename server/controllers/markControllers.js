const markService = require("../service/markService.js");
class MarkControllers {
  async createMark(req, res, next) {
    try {
      const { userId } = req.body;
      const { name, x, y } = req.body.mark;
      const newMark = await markService.createMark(userId, name, x, y);
      return res.json(newMark);
    } catch (e) {
      next(e);
    }
  }

  async getMarks(req, res, next) {
    try {
      const { userId } = req.query;
      const marks = await markService.getMarks(userId);
      res.json(marks);
    } catch (e) {
      next(e);
    }
  }

  async updateMark(req, res, next) {
    try {
      const { mark } = req.body;
      const updatedMark = await markService.updateMark(mark);
      return res.json(updatedMark);
    } catch (e) {
      next(e);
    }
  }

  async deleteMark(req, res, next) {
    try {
      const { markId } = req.params;
      await markService.deleteMark(markId);
      return res.json({ message: "Метка успешно удалена" });
    } catch (e) {
      next(e);
    }
  }
}
module.exports = new MarkControllers();
