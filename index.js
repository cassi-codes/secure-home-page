if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");
const ejsMate = require("ejs-mate");
const catchAsync = require("./utils/catchAsync");
const ExpressError = require("./utils/ExpressError");
const Applicant = require("./schema/model");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const Admin = require("./schema/admin");

const applicantRoutes = require("./routes/applicant");
const controlApplicantsRoutes = require("./routes/controlApplicants");
const adminRoutes = require("./routes/admin");

const mongoUri =
  process.env.MONGODB_URI || "mongodb://localhost:27017/secure_recruitment";
const MongoStore = require("connect-mongo");

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("MongoDBコネクションOK！！");
  })
  .catch((err) => {
    console.log("MongoDBコネクションエラー！！！");
    console.log(err);
  });

app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(morgan("common"));
app.use(express.static(path.join(__dirname, "public")));

const sessionConfig = {
  secret: process.env.SESSION_SECRET || "mySecret-local-only",
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: mongoUri
  }),
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24,
    sameSite: "lax",
  },
};

app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(Admin.authenticate()));
passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());
app.use(flash());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.use("/applicant", applicantRoutes);
app.use("/admin/applicants", controlApplicantsRoutes);
app.use("/admin", adminRoutes);

app.get("/", (req, res) => {
  res.redirect("/applicant/topPage");
});

app.get(
  "/api/check-phone/:phoneNumber",
  catchAsync(async (req, res) => {
    const existingApplicant = await Applicant.findOne({
      phoneNumber: req.params.phoneNumber,
    });
    res.json({ exists: !!existingApplicant });
  })
);

app.use((req, res, next) => {
  next(new ExpressError("ページが見つかりませんでした", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) {
    err.message = "問題が起きました";
  }
  res.status(statusCode).render("applicant/error", { err });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`ポート${PORT}でリクエスト待受中...`);
});
