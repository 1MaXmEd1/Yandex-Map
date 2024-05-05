import $api from "../http";

export default class Services {
  static async login(email, password) {
    return $api.post("/login", { email, password });
  }

  static async registration(email, password) {
    return $api.post("/registration", { email, password });
  }

  static async logout() {
    return $api.post("/logout");
  }

  static async getMarks(userId) {
    return $api.get(`/marker?userId=${userId}`);
  }

  static async createMark(userId, mark) {
    return $api.post("/marker", { userId, mark });
  }

  static async updateMark(mark) {
    return $api.put(`/marker/${mark._id}`, { mark });
  }

  static async deleteMark(markId) {
    return $api.delete(`/marker/${markId}`);
  }
}
