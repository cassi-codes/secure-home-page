const express = require("express");
const router = express.Router();

const validateApplicant = require("../utils/validateApplicant");
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn } = require("../utils/isLoggedIn");
const validatePhone = require("../utils/validatePhone");
const control = require("../controllers/controlApplicants");

router.get("/", isLoggedIn, catchAsync(control.showApplicants));

router.post("/", validateApplicant, validatePhone, catchAsync(control.submitApplicant));

router.delete("/:id", isLoggedIn, catchAsync(control.deleteApplicant));

module.exports = router;
