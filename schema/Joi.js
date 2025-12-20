const Joi = require("joi");

module.exports.applicantSchema = Joi.object({
  applicant: Joi.object({
    name: Joi.string().required(),
    birthDate: Joi.date().required(),
    category:
      Joi.string().required().valid("看護師", "介護士", "相談支援員", "その他"),
    phoneNumber: Joi.string().required().pattern(/^0[0-9]{9,10}$/).messages({
      'string.pattern.base': '電話番号は0から始まる10桁または11桁の数字である必要があります'
    }),
    requirements: Joi.string().allow('').optional(),
  }).required(),
});
