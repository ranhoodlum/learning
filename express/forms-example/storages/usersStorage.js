// this class simulates a database
class UsersStorage {
  constructor() {
    this.storage = {};
    this.id = 0;
  }

  addUser({ firstName, lastName, email, age, bio }) {
    const id = this.id;
    this.storage[id] = { id, firstName, lastName, email, age, bio };
    this.id++;
  }

  getUsers() {
    return Object.values(this.storage);
  }

  getUser(id) {
    return this.storage[id];
  }

  getUsersByName(name) {
    console.log(name);
    const [firstName, lastName] = name.split(" ");
    let users = [];
    for (const user of Object.values(this.storage)) {
      console.log(user.firstName, firstName, user.lastName, lastName);
      if (user.firstName === firstName && user.lastName === lastName) {
        users.push(user);
      }
    }

    return users;
  }

  getUsersByEmail(email) {
    let users = [];
    for (const user of Object.values(this.storage)) {
      if (user.email === email) {
        users.push(user);
      }
    }

    return users;
  }

  updateUser(id, { firstName, lastName, email, age, bio }) {
    this.storage[id] = { id, firstName, lastName, email, age, bio };
  }

  deleteUser(id) {
    // delete keyword to delete a property
    delete this.storage[id];
  }
}

module.exports = new UsersStorage();
