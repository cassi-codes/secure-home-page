const express = require("express");
const router = express.Router();

const validateApplicant = require("../utils/validateApplicant");
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn } = require("../utils/isLoggedIn");
const validatePhone = require("../utils/validatePhone");
const validateRecaptcha = require("../utils/validateRecaptcha");
const control = require("../controllers/controlApplicants");

router.get("/", isLoggedIn, catchAsync(control.showApplicants));

router.post("/", validateRecaptcha, validateApplicant, validatePhone, catchAsync(control.submitApplicant));

router.delete("/:id", isLoggedIn, catchAsync(control.deleteApplicant));

module.exports = router;
