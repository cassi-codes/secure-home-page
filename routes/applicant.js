const express = require("express");
const router = express.Router();
const Applicant = require("../schema/model");

const categories = Applicant.schema.path("category").enumValues;

router.get("/topPage", (req, res) => {
  res.render("applicant/topPage");
});

router.get("/form", (req, res) => {
  res.render("applicant/form", {
    categories,
    recaptchaSiteKey: process.env.RECAPTCHA_SITE_KEY,
  });
});

router.get("/success", (req, res) => {
  res.render("applicant/success");
});

module.exports = router;
