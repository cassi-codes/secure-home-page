const ExpressError = require("./ExpressError");
const { applicantSchema } = require("../schema/Joi");

const validateApplicant = (req, res, next) => {
  const { error } = applicantSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((detail) => detail.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

module.exports = validateApplicant;