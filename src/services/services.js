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

  static async getMarks() {
    return $api.get("/marker");
  }

  static async createMark(userId, name, coordinates) {
    return $api.post("/marker", {userId, name, coordinates});
  }

  static async updateMark(userId, markId, name, coordinates) {
    return $api.put("/marker/:id", {userId, markId, name, coordinates});
  }

  static async deleteMark(userId, markId) {
    return $api.delete("/marker/:id", {userId, markId});
  }
}
