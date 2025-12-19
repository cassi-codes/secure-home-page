
const validatePhone = async(req, res, next) =>{
    const { phoneNumber } = req.body.applicant;
    const existingApplicant = await Applicant.findOne({ phoneNumber });
    if (existingApplicant) {
      req.flash("error", "この電話番号は既に登録されています");
      return res.redirect("/applicant/form");
    }next()
};

module.exports = validatePhone