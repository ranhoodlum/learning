// these are just *some* of middlewares
// to check users, you can get more creative
// with this.

// custom isAuth middleware to check
// if the user is authenticated
module.exports.isAuth = (req, res, next) => {
  // This is how you check if a user is authenticated and protect a route.
  // You could turn this into a custom middleware to make it less redundant
  // Basically, this checks request.session.passport.user property is not null
  // if it's not null, its authenticated, else not
  if (req.isAuthenticated()) {
    next();
  } else {
    res
      // 401 unauthorized error
      .status(401)
      .json({ msg: "You are not authorized to visit this route." });
  }
};

module.exports.isAdmin = (req, res, next) => {
  // user is an admin
  if (req.isAuthenticated() && req.user.admin) {
    next();
  } else {
    res.status(401).json({ msg: "You aren't admin" });
  }
};
