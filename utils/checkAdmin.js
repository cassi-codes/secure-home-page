const catchAsync = require("./catchAsync");
const Admin = require("../schema/admin");


const noUser = catchAsync(async (req, res, next) => {
    const existingAdmin = await Admin.findOne();
    if (!existingAdmin) {
      req.flash("error", "管理人アカウントがありません。登録してください");
      return res.redirect("/admin/register");
    }next();
  });

const existUser = catchAsync(async (req, res, next) => {
    const existingAdmin = await Admin.findOne();
    if (existingAdmin) {
      req.flash("error", "管理人アカウントは既に登録されています。ログインしてください。");
      return res.redirect("/admin/login");
    }next();
  });

module.exports = {noUser, existUser};