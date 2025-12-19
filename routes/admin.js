const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { noUser, existUser } = require("../utils/checkAdmin");
const { isLoggedIn } = require("../utils/isLoggedIn");
const admins  = require("../controllers/admin");

router.get("/register", existUser, admins.adminRegisterForm);

router.post("/register", existUser, catchAsync(admins.adminRegister));

router.get("/login", noUser, admins.adminLoginForm);

router.post("/login", noUser, admins.adminLogin);

router.get("/logout", isLoggedIn, admins.adminLogout);

router.get("/changeAdmin", isLoggedIn, admins.changeAdminForm);

router.post("/changeAdmin", isLoggedIn, catchAsync(admins.changeAdmin));

module.exports = router;
