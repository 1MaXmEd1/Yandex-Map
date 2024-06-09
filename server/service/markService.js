const ApiError = require("../exceptions/apiError");
const MarkModel = require("../models/markModel");

class MarkService {
  async createMark(userId, name, x, y) {
    if (isNaN(x) && isNaN(y)) {
      throw ApiError.UnsupportedMediaType("Неверные входные данные");
    }
    if(name.length > 6){
      throw ApiError.UnsupportedMediaType("Название должно быть не больше 6 символов");
    }
    if (!name || !x || !y) {
      throw ApiError.UnsupportedMediaType("Поля не должны быть пустыми");
    }
    if (x < -85) {
      throw ApiError.UnsupportedMediaType("Превышен минимальный порог широты");
    }
    if (x > 85) {
      throw ApiError.UnsupportedMediaType("Превышен максимальный порог широты");
    }
    if (y < -175) {
      throw ApiError.UnsupportedMediaType("Превышен минимальный порог долготы");
    }
    if (y > 175) {
      throw ApiError.UnsupportedMediaType(
        "Превышен максимальный порог долготы"
      );
    }
    const newMark = await MarkModel.create({ userId, name, x, y });
    return newMark;
  }

  async getMarks(userId) {
    try {
      const marks = await MarkModel.find({ userId });
      return marks;
    } catch (e) {
      throw ApiError.BadRequest();
    }
  }

  async updateMark(mark) {
    if (isNaN(mark.x) && isNaN(mark.y)) {
      throw ApiError.UnsupportedMediaType("Неверные входные данные");
    }
    if(name.length > 6){
      throw ApiError.UnsupportedMediaType("Название должно быть не больше 6 символов");
    }
    if (!mark.name || !mark.x || !mark.y) {
      throw ApiError.UnsupportedMediaType("Поля не должны быть пустыми");
    }
    if (mark.x < -85) {
      throw ApiError.UnsupportedMediaType("Превышен минимальный порог широты");
    }
    if (mark.x > 85) {
      throw ApiError.UnsupportedMediaType("Превышен максимальный порог широты");
    }
    if (mark.y < -175) {
      throw ApiError.UnsupportedMediaType("Превышен минимальный порог долготы");
    }
    if (mark.y > 175) {
      throw ApiError.UnsupportedMediaType(
        "Превышен максимальный порог долготы"
      );
    }
    const updatedMark = await MarkModel.findByIdAndUpdate(mark._id, mark, {
      new: true,
    });
    return updatedMark;
  }

  async deleteMark(markId) {
    try {
      await MarkModel.findByIdAndDelete(markId);
    } catch (e) {
      throw ApiError.BadRequest();
    }
  }
}

module.exports = new MarkService();
