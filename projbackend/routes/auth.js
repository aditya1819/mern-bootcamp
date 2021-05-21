var express = require('express');
var router = express.Router();
const { signout, signup } = require('../controllers/auth');
const { check, validationResult } = require('express-validator');


router.post("/signup",[
    check("name","Name must be atleast 3 char").isLength({ min: 3}),
    check("email", "Please enter Valid email").isEmail(),
    check("password", "Password must be atleast 3 char").isLength({ min: 3})
], signup);
router.get("/signout", signout);

module.exports = router;