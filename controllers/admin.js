const passport = require("passport");
const Admin = require("../schema/admin");


module.exports.adminRegisterForm = (req, res) => {
  res.render("admin/register");
};

module.exports.adminRegister = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const admin = new Admin({ username });
    const registeredAdmin = await Admin.register(admin, password);
    req.login(registeredAdmin, (err) => {
      if (err) return next(err);
      req.session.save((err) => {
        if (err) return next(err);
        req.flash("success", "管理人アカウントが登録されました！");
        res.redirect("/admin/applicants");
      });
    });
  } catch (e) {
    req.flash("error", "エラーが発生しました！");
    res.redirect("/admin/register");
  }
};

module.exports.adminLoginForm = (req, res) => {
  res.render("admin/login");
};

module.exports.adminLogin = [
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/admin/login",
  }),
  (req, res, next) => {
    req.session.save((err) => {
      if (err) return next(err);
      req.flash("success", "ログインしました！");
      res.redirect("/admin/applicants");
    });
  }
];

module.exports.adminLogout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.flash("success", "ログアウトしました！");
    res.redirect("/admin/login");
  });
};

module.exports.changeAdminForm = (req, res) => {
  res.render("admin/changeAdmin");
};

module.exports.changeAdmin = async (req, res, next) => {
  const { username, password } = req.body;
  const user = await Admin.findById(req.user._id);
  if (username !== user.username) {
    user.username = username;
  }
  await user.setPassword(password);
  await user.save();
  req.login(user, (err) => {
    if (err) return next(err);
    req.session.save((err) => {
      if (err) return next(err);
      req.flash("success", "管理人アカウント情報が変更されました！");
      res.redirect("/admin/applicants");
    });
  });
};
