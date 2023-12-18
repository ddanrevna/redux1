const URL = "http://localhost:5001";
export default class API {
  static createNote(userId, title, text) {
    const createdAt = Date.now();

    return this.post("notes", {
      userId,
      title,
      text,
      createdAt,
    });
  }

  static signUp(email, password) {
    const createdAt = Date.now();

    return this.post("users", {
      email,
      password,
      createdAt,
    });
  }

  static editNote(id, title, text) {
    return this.patch(`notes/${id}`, { title, text });
  }

  static deleteNote(id) {
    return this.delete(`notes/${id}`);
  }

  static getNote(id) {
    return this.get(`notes/${id}`);
  }

  static getNotes(userId) {
    return this.get(`notes?userId=${userId}`);
  }

  static async getUser(id) {
    const users = await this.get(`users?id=${id}`);

    if (users.length !== 1) {
      throw new Error("Invalid data");
    }

    return users[0];
  }

  static getUsers() {
    return this.get("users");
  }

  static async get(endpoint) {
    const response = await fetch(`${URL}/${endpoint}`);

    return this.prepare(response);
  }

  static async post(endpoint, body) {
    const response = await fetch(`${URL}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    return this.prepare(response);
  }

  static async delete(endpoint) {
    const response = await fetch(`${URL}/${endpoint}`, {
      method: "DELETE",
    });

    return this.prepare(response);
  }

  static async patch(endpoint, body) {
    const response = await fetch(`${URL}/${endpoint}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(body),
    });

    return this.prepare(response);
  }

  static prepare(response) {
    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    return response.json();
  }
}
