# 訪問看護会社　応募者管理システム

訪問看護会社向けの応募者情報管理システムです。応募フォームから送信された情報をデータベースで一元管理し、管理者が効率的に閲覧・操作できます。

・プロジェクトの目的

訪問看護会社の採用業務を効率化し、応募者情報を安全かつ効率的に管理することを目的としています。

・ 主な機能

応募者向け機能
- 応募フォームからの情報入力
- 職種別の応募（看護師、理学療法士など）
- ワンクリック電話発信（電話番号タップで発信）

管理者向け機能
- 認証システム: 単一アカウントによる安全なログイン/ログアウト
- 応募者情報の閲覧: 職種別に自動整理された一覧表示
- 柔軟な削除機能: 
  - 個別削除: 特定の応募者を削除
  - 選択削除: 複数の応募者を一括削除
- セッション管理: 管理者と応募者を自動判別
- 専用UI: 管理者専用のnavbar/footer

・使用技術

バックエンド
- Node.js
- Express.js

データベース
- MongoDB Atlas

認証・セキュリティ
- express-session（セッション管理）
- express-password bcrypt（パスワードハッシュ化）

デプロイ
- Render

その他
- mongoose(schema)
- EJS（テンプレートエンジン）
- Bootstrap（UI/レスポンシブデザイン）

・デモ: ホームページ[https://secure-home-page.onrender.com/applicant/topPage]
(https://secure-home-page.onrender.com/applicant/topPage)
管理者ページ[https://secure-home-page.onrender.com/admin/login]
(https://secure-home-page.onrender.com/admin/login)

・機能詳細

セキュリティ機能
- 管理者アカウントを1つに制限し、情報漏洩リスクを最小化
- セッションベースの認証で管理者/応募者を判別
- パスワードのハッシュ化による安全な保存

UX/UI機能
- 電話番号クリックで即座に発信可能
- 職種別の自動ソート機能
- レスポンシブデザイン（スマホ対応）

・プロジェクト構造

secure-home-page/
├── models/          # Mongooseモデル
├── routes/          # ルート定義
├── views/           # EJSテンプレート
├── public/          # 静的ファイル（CSS, JS, 画像）
├── index.js         # メインサーバーファイル
├── .env             # 環境変数（Git管理外）
└── package.json     # 依存関係