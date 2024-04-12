import axios from "axios";
import Services from "../services/services";
import { API_URL } from "../http";

export default class Store {
  user = { email: "", id: "" };
  isAuth = false;

  setAuth(bool) {
    this.isAuth = bool;
  }

  setUser(inComingUser) {
    this.user.email = inComingUser.email;
    this.user.id = inComingUser.id;
  }

  async login(email, password) {
    try {
      const response = await Services.login(email, password);
      console.log(response);
      localStorage.setItem("token", response.data);
      this.setAuth(true);
      this.setUser(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  async registration(email, password) {
    try {
      const response = await Services.registration(email, password);
      console.log(response);
      localStorage.setItem("token", response.data);
      this.setAuth(true);
      this.setUser(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  async logout() {
    try {
      const response = await Services.logout();
      localStorage.removeItem("token");
      this.setAuth(false);
      this.setUser({});
    } catch (e) {
      console.log(e);
    }
  }

  async getMarks() {
    try {
      const response = await Services.getMarks();
      console.log(response)
      return response
    } catch (e) {
      console.log(e);
    }
  }

  async createMark() {
    try {
      const response = await Services.createMark();
      console.log(response)
      return response
    } catch (e) {
      console.log(e);
    }
  }

  async checkAuth() {
    try {
      const response = await axios.get(`${API_URL}/refresh`, {withCredentials: true})
      localStorage.setItem("token", response.data.user);
      this.setAuth(true);
      this.setUser(response.data.user);
      console.log(this.user, this.isAuth)
      return response
    } catch (e) {
      console.log(e);
    }
  }
}
