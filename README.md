
## 🚀 Overview
This is a web-based quiz application with gamification features designed to enhance user engagement. The app dynamically fetches quiz data from an API and presents it through an intuitive and interactive UI. Users can answer questions, track progress, and compete on leaderboards.

## 🌟 Features
- 🎯 **Interactive Quiz Experience** – Animations & smooth transitions for engagement.
- 🔄 **Gamification Elements** – Scoring system, leaderboard tracking.
- 📊 **Dynamic Question Fetching** – Retrieves questions from an API.
- 📱 **Responsive UI** – Optimized for mobile and desktop.

---

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/saptarshi11/Quiz-Flow-with-Gamification.git
cd Quiz-Flow-with-Gamification
```

### 2️⃣ Install Dependencies
```sh
npm install
```


### 4️⃣ Start the Development Server
```sh
npm run dev
```
The application will be accessible at **http://localhost:3000**.

---
## 5 Screenshot
![Screenshot 2025-02-04 004229](https://github.com/user-attachments/assets/d93c283a-45e3-4b7e-9f59-894a46ae9255)
![Screenshot 2025-02-04 004243](https://github.com/user-attachments/assets/cdcd877c-0748-46c5-8989-60915e104945)
![Screenshot 2025-02-04 004317](https://github.com/user-attachments/assets/9c739ec4-8cdb-494b-85a3-c53bdb286413)

## 🏗 Project Structure
```
├── app/
│   ├── components/
│   │   ├── AnimatedBackground.tsx
│   │   ├── Background3D.tsx
│   │   ├── LeaderboardScreen.tsx
│   │   ├── NameEntryScreen.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── QuestionComponent.tsx
│   │   ├── QuizApp.tsx
│   │   ├── QuizNavigator.tsx
│   │   ├── ResultScreen.tsx
│   │   ├── StartScreen.tsx
│   │   └── Timer.tsx
│   ├── reducers/
│   │   ├── quizReducer.ts
│   ├── types/
│   │   ├── quiz.ts
│   ├── utils/
│   │   ├── api.ts
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
├── .eslintrc.json
├── .gitignore
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── README.md
├── tailwind.config.ts
├── tsconfig.json
```

---

## 🎮 Gameplay Flow
1️⃣ **Start Screen** → Welcome message & Start button  
2️⃣ **Enter Name** → Player enters name to personalize the experience  
3️⃣ **Quiz Begins** → Answer questions within a time limit  
4️⃣ **Score Calculation** → Instant feedback after each answer  
5️⃣ **Leaderboard** → Track progress against other players  

---

## ⚙️ Technologies Used

### **Frontend**
- **React** – UI library for building interactive components.
- **Next.js** – React framework for server-side rendering & static site generation.
- **TypeScript** – Strongly typed JavaScript.
- **Tailwind CSS** – Utility-first CSS framework for rapid UI development.
- **Framer Motion** – Smooth animations and transitions.
- **Three.js** – 3D graphics rendering.

### **State Management**
- **useReducer** – Manages complex state transitions efficiently.

### **Backend (if applicable)**
- **API Fetching** – Fetch API / Axios.

### **Build & Config**
- **PostCSS** – CSS transformations.
- **ESLint** – JavaScript and TypeScript linting.
- **Tailwind Config** – Custom styles setup.

### **Deployment**
- **Vercel** – Seamless Next.js deployment.

---


## 🤝 Contributing
Want to improve the quiz experience? Feel free to submit issues or pull requests!

1. **Fork** the repository.
2. **Create a feature branch** (`git checkout -b feature-name`).
3. **Commit your changes** (`git commit -m "Add feature"`).
4. **Push to GitHub** (`git push origin feature-name`).
5. **Create a Pull Request**.


## 📧 Contact
📌 **Author:** [Saptarshi Mukherjee](https://github.com/saptarshi11)  
📌 **Project Repo:** [Quiz Flow with Gamification](https://github.com/saptarshi11/Quiz-Flow-with-Gamification)
```
