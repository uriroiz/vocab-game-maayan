# ⚡ Quick Start Guide

Get the Vocabulary Game running in **5 minutes**! 

## 🚀 First Time Setup

### Step 1: Install Dependencies (One-Time Only)

Open PowerShell in this folder and run:

```powershell
npm install
```

**Wait time:** 2-3 minutes (downloads all necessary packages)

### Step 2: Start the Game

```powershell
npm start
```

**The game will automatically open in your browser at `http://localhost:3000`**

That's it! You're ready to play! 🎉

---

## 🎮 How to Play

1. **Home Screen:**
   - Optionally upload a custom CSV word list
   - Click "Start Playing!"

2. **Game Screen:**
   - Read the question (English or Hebrew)
   - Click one of the 4 answer choices
   - See instant feedback (GREEN = correct, RED = wrong)
   - 20 questions per game

3. **Results Screen:**
   - View your score
   - Check the leaderboard
   - Click "Play Again!" for another round

---

## 📁 Using Custom Word Lists

### Quick Method:
1. Use the included `sample-words.csv` or `English-Hebrew-Words-No-Duplicates.csv`
2. On the home screen, click "Choose CSV File"
3. Select your file
4. Start playing!

### Create Your Own:
See **WORD_LIST_GUIDE.md** for detailed instructions.

**CSV Format:**
```csv
English,Hebrew
apple,תפוח
book,ספר
```

---

## 🌐 Deploy to GitHub Pages (Optional)

Want Maayan to access the game online from anywhere?

**Simple Version:**
```powershell
npm run deploy
```

**Detailed Instructions:** See **DEPLOYMENT.md**

---

## 📋 Common Commands

```powershell
# Start the game locally
npm start

# Stop the game
# Press Ctrl+C in the terminal

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

---

## 🆘 Quick Fixes

### "npm not found"
→ Install Node.js from [nodejs.org](https://nodejs.org/)

### Port 3000 already in use
→ Press `Ctrl+C` to stop any running servers, then try `npm start` again

### Game not loading
→ Make sure you ran `npm install` first

### Hebrew text looks wrong
→ Save CSV files as UTF-8 encoding

---

## 📚 More Help

- **Full documentation:** README.md
- **Deployment guide:** DEPLOYMENT.md  
- **CSV creation:** WORD_LIST_GUIDE.md

---

## 🎯 Pro Tips

1. **Create multiple word lists** for different topics
2. **Track progress** using the leaderboard
3. **Practice daily** for best results
4. **Mix up the difficulty** by using different word lists
5. **Challenge family members** to beat your score!

---

**That's all you need to get started!** 🌟

*Have fun learning!* 📚✨

