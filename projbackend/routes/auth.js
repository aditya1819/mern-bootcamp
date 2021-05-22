var express = require("express");
var router = express.Router();
const { signout, signup, signin, isSignedIn } = require("../controllers/auth");
const { check, validationResult } = require("express-validator");

router.post(
  "/signup",
  [
    check("name", "Name must be atleast 3 char").isLength({ min: 3 }),
    check("email", "Please enter Valid email").isEmail(),
    check("password", "Password must be atleast 3 char").isLength({ min: 3 }),
  ],
  signup
);

router.post(
  "/signin",
  [
    check("email", "Email id Required !").isEmail(),
    check("password", "Password Required !").isLength({ min: 3 }),
  ],
  signin
);

router.get("/signout", signout);

router.get("/testroute", isSignedIn, (req, res) => {
    res.json(req.auth);
});

module.exports = router;
