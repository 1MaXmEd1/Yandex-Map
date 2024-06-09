import axios from "axios";
import Services from "../services/services";
import { API_URL } from "../http/axiosConfig";
import { makeAutoObservable } from "mobx";
export default class Store {
  user = { id: null, email: null, isAdmin: false };
  isAuth = false;

  constructor() {
    makeAutoObservable(this);
  }

  setUser(inComingUser) {
    this.user.id = inComingUser.id;
    this.user.email = inComingUser.email;
    this.user.isAdmin = inComingUser._isAdmin;
  }

  setAuth(bool) {
    this.isAuth = bool;
  }

  async login(email, password) {
    try {
      const response = await Services.login(email, password);
      localStorage.setItem("token", response.data.refreshToken);
      this.setUser(response.data.user);
      this.setAuth(true);
    } catch (e) {
      alert(e.response.data.message);
    }
  }

  async registration(email, password) {
    try {
      const response = await Services.registration(email, password);
      localStorage.setItem("token", response.data.refreshToken);
      this.setUser(response.data);
      this.setAuth(true);
    } catch (e) {
      alert(e.response.data.message);
    }
  }

  async logout() {
    try {
      await Services.logout();
      localStorage.removeItem("token");
      this.setAuth(false);
      this.setUser({});
      console.log(this.isAuth);
      return this.isAuth;
    } catch (e) {
      alert(e.response.data.message);
    }
  }

  async checkAuth() {
    try {
      const response = await axios.get(`${API_URL}/refresh`, {
        withCredentials: true,
      });
      if (response.data.user) {
        localStorage.setItem("token", response.data.refreshToken);
        this.setUser(response.data.user);
        this.setAuth(true);
        return this.isAuth;
      } else {
        return false;
      }
    } catch (e) {
      alert(e);
    }
  }

  async getMarks(userId) {
    try {
      const response = await Services.getMarks(userId);
      return response.data;
    } catch (e) {
      alert(e.response.data.message);
    }
  }

  async createMark(mark) {
    try {
      const response = await Services.createMark(this.user.id, mark);
      return response;
    } catch (e) {
      alert(e.response.data.message);
    }
  }

  async updateMark(mark) {
    try {
      const response = await Services.updateMark(mark);
      return response;
    } catch (e) {
      alert(e.response.data.message);
    }
  }

  async deleteMark(markId) {
    try {
      const response = await Services.deleteMark(markId);
      return response;
    } catch (e) {
      alert(e.response.data.message);
    }
  }

  async getUsers() {
    try {
      const response = await Services.getUsers();
      return response;
    } catch (e) {
      alert(e.response.data.message);
    }
  }
}
