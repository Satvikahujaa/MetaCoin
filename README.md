# 🪙 MetaCoin - Flip The Coin

**Live Demo:** [https://coingamebysatvik.netlify.app/](https://coingamebysatvik.netlify.app/)

---

## 📋 Description
**Flip The Coin** is a simple, fun, and interactive web-based game built using **HTML, CSS, and JavaScript**.  
Players can choose **Heads** or **Tails**, flip a virtual coin, and instantly see the result. The app keeps track of your **wins and losses** using local storage — so your score stays even after reloading the page!

---

## 🚀 Features
✅ Choose between **Heads** or **Tails**  
✅ Real-time **coin flip simulation**  
✅ **Score tracking** stored locally in the browser  
✅ **Responsive design** for mobile and desktop  
✅ **Reset score** option  
✅ Hosted live on **Netlify**

---

## 🛠️ Tech Stack
- **HTML5** – Structure  
- **CSS3** – Styling and layout  
- **JavaScript (Vanilla)** – Game logic and interactivity  
- **Netlify** – Deployment and hosting  

---

## 📂 Project Structure
```
FlipTheCoin/
│
├── index.html          # Main HTML file
├── style.css           # Styling for UI
├── script.js           # Game logic (heads/tails, score)
├── dime-heads.webp     # Coin heads image
├── 484-4843569_quarter-transparent-tail-coin-hd-png-download.png  # Coin tails image
└── README.md           # Project documentation
```

---

## ⚙️ How It Works
1. Open the website.  
2. Click **HEADS** or **TAILS**.  
3. The game randomly generates the computer’s move.  
4. Your win or loss is displayed instantly.  
5. Check your total wins and losses.  
6. Click **Reset Score** anytime to start over.

---

## 🧠 Code Overview
- **`playgame()`** → Handles player's move and checks against computer result.  
- **`computersteps()`** → Randomly returns `'heads'` or `'tails'`.  
- **`updateDisplay()`** → Updates score, result, and moves on screen.  
- **`resetscore()`** → Clears all stored data and resets display.  

---

## 💾 Local Storage
The game uses `localStorage` to persist your win/loss record even after refreshing the page:
```js
localStorage.setItem('score', JSON.stringify(score));
```

---

## 🧑‍💻 How to Run Locally
1. Clone the repo  
   ```bash
   git clone https://github.com/yourusername/flip-the-coin.git
   ```
2. Navigate to the folder  
   ```bash
   cd flip-the-coin
   ```
3. Open `index.html` in your browser  
4. Start flipping the coin!

---

## 🌐 Deployment
This project is deployed via **Netlify**:  
➡️ [https://satvikflipthecoin.netlify.app/](https://satvikflipthecoin.netlify.app/)

To deploy your own version:
1. Create a Netlify account  
2. Link your GitHub repo  
3. Click **Deploy Site**  

---

## 🧩 Future Enhancements
- Add coin flip **animation**
- Add **sound effects**
- Display **coin flip history**
- Introduce a **leaderboard**

---

## 📸 Preview
_Add screenshots or demo GIF here later._

---

## 🧑‍🎨 Author
**Satvik Ahuja**  
🔗 [GitHub](https://github.com/yourusername) | 🌐 [Live Site](https://satvikflipthecoin.netlify.app/)
