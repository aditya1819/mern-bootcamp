const User = require("../models/user");
const { check, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expessJwt = require("express-jwt");

// signup controller
exports.signup = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: "NOT able to save user in DB",
      });
    }
    res.json(user);
  });
};

// signin controller
exports.signin = (req, res) => {
  const { email, password } = req.body; // Destructring of data

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "Email does not exists !",
      });
    }

    if (!user.autheticate(password)) {
      return res.status(401).json({
        error: "Email and Password do not match",
      });
    }

    // create token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    // put token in cookie
    res.cookie("token", token, { expire: new Date() + 9999 });

    // send res to FE
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, name, email, role } });
  });
};

// signout controller
exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "User Signed out Successfully",
  });
};

// protected routes
exports.isSignedIn = expessJwt({
  secret: process.env.SECRET,
  userProperty: "auth",
});

// custom midddlewares
exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id === req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "ACCESS DENIED !",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    res.status(403).json({
      error: "NO ADMIN PRIVILIAGE",
    });
  }
  next();
};
