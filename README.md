
# 📚 K-EduNest

![Banner](public/banner-preview.png)

> Your all-in-one educational portal for exploring colleges, managing admissions, and tracking personal academic records.

---

## 🌐 Live Preview

🔗 [Visit K-EduNest](https://kedunest.vercel.app)

---

## 🧠 Overview

**K-EduNest** is a modern web app for students to:
- Explore colleges
- Apply for admissions
- Track their applied colleges
- View and update profile info

Built using **Next.js, Firebase Auth, Tailwind CSS, and MongoDB**, the platform ensures a smooth, secure, and mobile-friendly experience.

---

## 🛠️ Tech Stack

| Technology    | Description                           |
|---------------|---------------------------------------|
| **Next.js**   | App router with SSR and CSR           |
| **TailwindCSS** | Utility-first styling                |
| **Firebase**  | Authentication (GitHub login)         |
| **MongoDB**   | Backend database for storing users, colleges, and admissions |
| **Express.js**| REST API handling                     |
| **React Hook Form** | Form management                |
| **SweetAlert2** | For modals and alerts               |
| **React Icons** | Icon library for UI elements       |

---

## ✨ Features

- 🔐 **Authentication with Firebase (GitHub Login)**
- 🏫 **College Listings** with details
- 📝 **Admission Form** for each college
- 🧑‍🎓 **My College** view (track your applications)
- 👤 **User Profile** (view and update info)
- 📱 **Fully Responsive UI**
- 🌙 **Dark Glassy Navbar Design**
- 🎉 **Animated Elements using `react-awesome-reveal`**
- 📎 **Firebase email verification status display**
- ✅ **Protected Routes** for certain features

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/kamrul2006/k-edunest.git
cd k-edunest
````

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file and add:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender
NEXT_PUBLIC_FIREBASE_APP_ID=your_app
```

### 4. Run the app

```bash
npm run dev
```

---

## 🔐 Authentication

* Auth handled via **Firebase**.
* Supports GitHub login.
* Tracks `emailVerified`.
* Displays login/logout buttons conditionally.
* Profile name & photo shown in navbar.

---

## 📁 Folder Structure (Key Parts)

```
├── app/
│   ├── layout.js
│   ├── page.js
│   └── admission/
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   └── ...
├── pages/
│   └── api/ (optional backend if hybrid)
├── public/
│   ├── logo.png
│   ├── banner-preview.png
│   └── ...
├── styles/
├── utils/
└── firebase/
    └── firebase.config.js
```

---

## 🤝 Contribution

Contributions, issues, and feature requests are welcome!

```bash
# Fork the repo
# Create your feature branch
git checkout -b feature/awesome-feature

# Commit your changes
git commit -m "Added awesome feature"

# Push and open a PR
git push origin feature/awesome-feature
```

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 📬 Contact

**Kamrul Islam Apurba**
📧 Email: [kamrul@example.com](mailto:kamrul@example.com)
🌐 GitHub: [@K-WEB TEc](https://github.com/K-WEB-TEc)

---

> Made with Next.js & 💙 by Apurba.


