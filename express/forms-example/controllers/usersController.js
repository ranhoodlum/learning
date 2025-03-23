const usersStorage = require("../storages/usersStorage");
const userStorage = require("../storages/usersStorage");
const { body, validationResult } = require("express-validator");

const alphaError = "Must only contain Letters";
const lengthError = "Must be between 1 and 10 characters";

// this is validator, i'spose
const validateUser = [
  body("firstName")
    // ensures firstName is trimmed
    .trim()
    // validate if the firstName is entirely alphabet, if not throw this message
    .isAlpha()
    .withMessage(`First Name ${alphaError}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`First Name ${lengthError}`),

  body("lastName")
    .trim()
    .isAlpha()
    .withMessage(`Last Name ${alphaError}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`Last Name ${lengthError}`),
];

// this is an array of middleware functions
// remember! an array of middleware is valid in a route
// think of this controller as the entire middleware chain
//
// and since express flattens the array, validateUser being
// an array as well makes perfect sense.
//
// someroute.get("/create", postCreateUser), thus, is valid
const postCreateUser = [
  // this already runs before passing control to the next
  // middleware
  validateUser,
  (req, res) => {
    // validationResult is only for extracting the validation
    // errors from the middleware before this one.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("createUser", {
        title: "Create User",
        errors: errors.array(),
      });
    }

    // if no errors
    const { firstName, lastName } = req.body;
    userStorage.addUser({ firstName, lastName });
    res.redirect("/");
  },
];

function getUsersList(req, res, next) {
  res.render("index", { title: "Users", users: userStorage.getUsers() });
}

function getCreateUser(req, res, next) {
  res.render("createUser", { title: "Create a user" });
}

function getUpdateUser(req, res) {
  res.render("updateUser", {
    title: "Update User",
    user: usersStorage.getUser(req.params.id),
  });
}

const postUpdateUser = [
  validateUser,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("updateUser", {
        title: "Update User",
        user: usersStorage.getUser(req.params.id),
        errors: errors.array(),
      });
    }

    const { firstName, lastName } = req.body;
    usersStorage.updateUser(req.params.id, { firstName, lastName });
    res.redirect("/");
  },
];

//function postCreateUser(req, res, next) {
//  const { firstName, lastName } = req.body;
//  userStorage.addUser({ firstName, lastName });
//  res.redirect("/");
//}

module.exports = {
  getUsersList,
  getCreateUser,
  postCreateUser,
  getUpdateUser,
  postUpdateUser,
};
