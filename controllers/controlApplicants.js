const { calculateAge, sortPhoneNumber } = require("../utils/sortPhoneNumber");
const Applicant = require("../schema/model");
const categories = Applicant.schema.path("category").enumValues;


module.exports.showApplicants = async (req, res) => {
  const workersByCategory = Object.fromEntries(
    await Promise.all(
      categories.map(async (category) => [
        category,
        await Applicant.find({ category }),
      ])
    )
  );
  res.render("admin/applicants", {
    categories,
    workersByCategory,
    calculateAge,
    sortPhoneNumber,
  });
}

module.exports.submitApplicant = async (req, res) => {
  try {
    const newApplicant = new Applicant(req.body.applicant);
    await newApplicant.save();
    req.flash("success", "応募が完了しました");
    res.redirect("/applicant/success");
  } catch (error) {
    if (error.code === 11000) {
      req.flash("error", "この電話番号は既に登録されています");
      return res.redirect("/applicant/form");
    }
    throw error;
  }
}

module.exports.deleteApplicant = async (req, res) => {
  const { id } = req.params;
  await Applicant.findByIdAndDelete(id);
  res.redirect("/admin/applicants");
}