import axios from "axios";
import Services from "../services/Services";
import { API_URL } from "../http/Index";
export default class Store {
  user = { email: null, id: null, isAdmin: false, isAuth: false };

  setUser(inComingUser) {
    this.user.email = inComingUser.email;
    this.user.id = inComingUser.id;
    this.user.isAdmin = inComingUser._isAdmin;
  }

  setAuth(bool) {
    this.user.isAuth = bool;
  }

  async login(email, password) {
    try {
      const response = await Services.login(email, password);
      console.log(response.data);
      localStorage.setItem("token", response.data.refreshToken);
      this.setUser(response.data.user);
      this.setAuth(true);
    } catch (e) {
      console.log(e);
    }
  }

  async registration(email, password) {
    try {
      const response = await Services.registration(email, password);
      console.log(response);
      localStorage.setItem("token", response.data.refreshToken);
      this.setAuth(true);
      this.setUser(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  async logout() {
    try {
      await Services.logout();
      localStorage.removeItem("token");
      this.setAuth(false);
      this.setUser({});
    } catch (e) {
      console.log(e);
    }
  }

  async checkAuth() {
    try {
      const response = await axios.get(`${API_URL}/refresh`, {
        withCredentials: true,
      });
      localStorage.setItem("token", response.data.refreshToken);
      this.setAuth(true);
      this.setUser(response.data.user);
      return response;
    } catch (e) {
      console.log(e);
    }
  }

  async getMarks(userId) {
    try {
      const response = await Services.getMarks(userId);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  }

  async createMark(mark) {
    try {
      const response = await Services.createMark(this.user.id, mark);
      return response;
    } catch (e) {
      console.log(e);
    }
  }

  async updateMark(mark) {
    try {
      console.log(mark);
      const response = await Services.updateMark(mark);
      return response;
    } catch (e) {
      console.log(e);
    }
  }

  async deleteMark(markId) {
    try {
      const response = await Services.deleteMark(markId);
      return response;
    } catch (e) {
      console.log(e);
    }
  }

  async getUsers() {
    try {
      const response = await Services.getUsers();
      return response;
    } catch (e) {
      console.log(e);
    }
  }
}
