module.exports = class UserDto {
  constructor(module) {
    if (!module || typeof module !== "object") {
      throw new Error("Предоставлен неверный пользовательский модуль");
    }

    if (!module.email || !module._id) {
      throw new Error("Неверная структура пользовательского модуля");
    }

    this.email = module.email;
    this.id = module._id;
  }

  get getEmail() {
    return this.email;
  }

  get getId() {
    return this.id;
  }
};
