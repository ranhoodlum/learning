const usersStorage = require("../storages/usersStorage");
const userStorage = require("../storages/usersStorage");
const { body, query, validationResult } = require("express-validator");

const alphaError = "Must only contain Letters";
const lengthError = "Must be between 1 and 10 characters";

// this is validator, i'spose
const validateUser = [
  body("firstName")
    // trim the value if present
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

  body("email").trim().isEmail().withMessage("Not a valid email!"),

  body("age")
    .optional()
    .trim()
    .isInt({ min: 18, max: 120 })
    .withMessage("Age must be a number between 18 and 120"),

  body("bio").optional().trim().isLength({ max: 200 }),
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
    const { firstName, lastName, email, age, bio } = req.body;
    userStorage.addUser({ firstName, lastName, email, age, bio });
    res.redirect("/");
  },
];

function getUsersList(req, res, next) {
  res.render("index", {
    title: "Users",
    users: userStorage.getUsers(),
  });
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

    const { firstName, lastName, email, age, bio } = req.body;
    usersStorage.updateUser(req.params.id, {
      firstName,
      lastName,
      email,
      age,
      bio,
    });
    res.redirect("/");
  },
];

function postDeleteUser(req, res) {
  const { id } = req.params;
  userStorage.deleteUser(id);
  res.redirect("/");
}

// only for search
const validateSearch = [
  query("name")
    .if(query("email").isEmpty())
    .notEmpty()
    .withMessage("Name and email both can't be empty")
    .isLength({ min: 1, max: 20 })
    .withMessage("Name must be between 1 and 20 characters long"),

  query("email")
    .if(query("name").isEmpty())
    .notEmpty()
    .withMessage("Name and email both can't be empty")
    .isEmail()
    .withMessage("Email must be a valid mail"),
];

// don't think of this as a function, but
// a bunch of functions that control the request
// to response
const getSearchUser = [
  validateSearch,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("index", {
        title: "Users",
        errors: errors.array(),
        users: usersStorage.getUsers(),
      });
    }

    const { name, email } = req.query;
    let users;

    if (!email) {
      users = usersStorage.getUsersByName(name);
    } else if (!name) {
      users = usersStorage.getUsersByEmail(email);
    } else {
      // to create non-duplicate array of users
      users = [
        ...new Set(
          usersStorage
            .getUsersByName(name)
            .concat(usersStorage.getUsersByEmail(email)),
        ),
      ];
    }

    res.render("search.ejs", {
      title: "Searched Users",
      users: users,
    });
  },
];

module.exports = {
  getUsersList,
  getCreateUser,
  postCreateUser,
  getUpdateUser,
  postUpdateUser,
  postDeleteUser,
  getSearchUser,
};
