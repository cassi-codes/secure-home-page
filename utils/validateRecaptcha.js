const validateRecaptcha = async (req, res, next) => {
  const token = req.body["g-recaptcha-response"];
  console.log("reCAPTCHA token received:", token ? "Yes (length: " + token.length + ")" : "No");
  console.log("Secret key loaded:", process.env.RECAPTCHA_SECRET_KEY ? "Yes" : "No");

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
    console.log("reCAPTCHA response:", data);

    if (!data.success || data.score < 0.5) {
      req.flash("error", "reCAPTCHA認証に失敗しました。もう一度お試しください。");
      return res.redirect("/applicant/form");
    }

    delete req.body["g-recaptcha-response"];
    next();
  } catch (error) {
    req.flash("error", "認証の確認中にエラーが発生しました。もう一度お試しください。");
    return res.redirect("/applicant/form");
  }
};

module.exports = validateRecaptcha;
