if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const mongoose = require("mongoose");
const Applicant = require("../schema/model");

const mongoUri =
  process.env.MONGODB_URI || "mongodb://localhost:27017/secure_recruitment";

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("MongoDBコネクションOK！！");
  })
  .catch((err) => {
    console.log("MongoDBコネクションエラー！！！");
    console.log(err);
  });

const categories = ["看護師", "介護士", "相談支援員", "その他"];

const firstNames = [
  "太郎",
  "花子",
  "一郎",
  "美咲",
  "健太",
  "さくら",
  "翔太",
  "優子",
  "大輔",
  "愛",
  "勇気",
  "真理",
  "拓也",
  "千春",
  "隆",
  "由美",
  "正樹",
  "菜々子",
  "浩二",
  "恵美",
];

const lastNames = [
  "田中",
  "佐藤",
  "鈴木",
  "高橋",
  "伊藤",
  "渡辺",
  "山本",
  "中村",
  "小林",
  "加藤",
  "吉田",
  "山田",
  "佐々木",
  "山口",
  "松本",
  "井上",
  "木村",
  "林",
  "斎藤",
  "清水",
];

const requirements = [
  "夜勤の有無について教えてください",
  "週3日勤務希望です",
  "土日休み希望です",
  "資格取得支援制度はありますか",
  "できるだけ早く働きたいです",
  "子育て中ですが、時短勤務は可能でしょうか",
  "給与の詳細を知りたいです",
  "研修制度について詳しく教えてください",
  "車通勤は可能ですか",
  "福利厚生について教えてください",
  "残業時間はどのくらいでしょうか",
  "ブランクがありますが大丈夫でしょうか",
  "正社員での採用を希望しています",
  "パート勤務から始めたいです",
  "転勤の可能性はありますか",
  "",
  "",
  "未経験ですが応募可能でしょうか",
  "有給休暇の取得状況を教えてください",
  "施設見学は可能ですか",
];

const generateBirthDate = () => {
  const year = 1960 + Math.floor(Math.random() * 45); // 1960-2004年
  const month = 1 + Math.floor(Math.random() * 12);
  const day = 1 + Math.floor(Math.random() * 28);
  return new Date(year, month - 1, day);
};

const generatePhoneNumber = (index) => {
  const prefixes = ["090", "080", "070"];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const remaining = String(10000000 + index).padStart(8, "0");
  return prefix + remaining;
};

const seedApplicants = [];

for (let i = 0; i < 20; i++) {
  const applicant = {
    name: lastNames[i] + firstNames[i],
    birthDate: generateBirthDate(),
    phoneNumber: generatePhoneNumber(i),
    requirements: requirements[i],
    category: categories[Math.floor(Math.random() * categories.length)],
  };
  seedApplicants.push(applicant);
}

const seedDB = async () => {
  try {
    await Applicant.deleteMany({});
    console.log("既存のデータを削除しました");

    await Applicant.insertMany(seedApplicants);
    console.log("20件のシードデータを作成しました");

    console.log("\n作成されたデータ:");
    seedApplicants.forEach((applicant, index) => {
      console.log(
        `${index + 1}. ${applicant.name} - ${applicant.phoneNumber} - ${applicant.category}`
      );
    });
  } catch (err) {
    console.error("エラーが発生しました:", err);
  } finally {
    mongoose.connection.close();
    console.log("\nデータベース接続を閉じました");
  }
};

seedDB();
