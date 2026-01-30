const validateRecaptcha = async (req, res, next) => {
  const token = req.body["g-recaptcha-response"];

  if (!token) {
    req.flash("error", "reCAPTCHA認証に失敗しました。もう一度お試しください。");
    return res.redirect("/applicant/form");
  }

  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const verifyUrl = "https://www.google.com/recaptcha/api/siteverify";

  try {
    const response = await fetch(verifyUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${secretKey}&response=${token}`,
    });

    const data = await response.json();

    if (!data.success || data.score < 0.5) {
      req.flash("error", "reCAPTCHA認証に失敗しました。もう一度お試しください。");
      return res.redirect("/applicant/form");
    }

    next();
  } catch (error) {
    req.flash("error", "認証の確認中にエラーが発生しました。もう一度お試しください。");
    return res.redirect("/applicant/form");
  }
};

module.exports = validateRecaptcha;
