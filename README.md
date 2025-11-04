# 🚀 Vocabulary Adventure for Maayan

An interactive English-Hebrew vocabulary learning game built with React. Practice translations in both directions with a fun, colorful interface!

## ✨ Features

- **Bidirectional Learning**: Practice both English→Hebrew and Hebrew→English translations
- **Random Questions**: 20 random vocabulary questions per game
- **Multiple Choice**: 4 answer options for each question
- **Instant Feedback**: Correct answers shown in GREEN, wrong selections in RED
- **Score Tracking**: Track your progress and maintain a leaderboard
- **Custom Word Lists**: Upload your own CSV files with vocabulary
- **RTL Support**: Full support for Hebrew (right-to-left) text
- **Responsive Design**: Works beautifully on mobile devices and tablets
- **Local Storage**: Leaderboard persists between sessions
- **Celebration Effects**: Fun animations when you get answers right! 🎉

## 📋 Prerequisites

Before you begin, ensure you have installed:
- [Node.js](https://nodejs.org/) (version 14 or higher)
- npm (comes with Node.js)

To check if you have Node.js installed, run:
```bash
node --version
npm --version
```

## 🛠️ Installation

1. **Navigate to the project folder** (if not already there):
   ```bash
   cd C:\Scripts\Kids\Maayan\EnglishTest
   ```

2. **Install all dependencies**:
   ```bash
   npm install
   ```
   
   This will install:
   - React and React DOM
   - Tailwind CSS (for styling)
   - Lucide React (for icons)
   - gh-pages (for GitHub Pages deployment)
   - All other necessary packages

## 🎮 Running Locally

To start the game on your local computer:

```bash
npm start
```

This will:
- Start the development server
- Automatically open your browser to `http://localhost:3000`
- Hot-reload when you make changes to the code

**To stop the server:** Press `Ctrl+C` in the terminal

## 📝 Adding Custom Vocabulary

### CSV File Format

Create a CSV file with this format:

```csv
English,Hebrew
pencil,עיפרון
book,ספר
teacher,מורה
train,רכבת
happy,שמח
friend,חבר
school,בית ספר
```

**Important Notes:**
- First line MUST be the header: `English,Hebrew`
- One word pair per line
- No extra spaces around commas
- Save as UTF-8 encoding to properly display Hebrew characters

### How to Use Your CSV

1. Start the game (`npm start`)
2. On the home screen, click "Choose CSV File"
3. Select your CSV file
4. Click "Start Playing!" to begin with your custom word list

**Sample File Included**: The folder includes `English-Hebrew-Words-No-Duplicates.csv` that you can use or modify.

## 🏗️ Building for Production

To create an optimized production build:

```bash
npm run build
```

This creates a `build` folder with:
- Minified JavaScript and CSS
- Optimized assets
- Ready-to-deploy files

## 🌐 Deploying to GitHub Pages

### First-Time Setup

1. **Create a GitHub repository**:
   - Go to [GitHub](https://github.com)
   - Click "New Repository"
   - Name it `vocab-game` (or any name you prefer)
   - Click "Create repository"

2. **Update the homepage in package.json**:
   - Open `package.json`
   - Change line 5 from:
     ```json
     "homepage": "https://YOUR_GITHUB_USERNAME.github.io/vocab-game",
     ```
     to:
     ```json
     "homepage": "https://your-actual-username.github.io/your-repo-name",
     ```

3. **Initialize Git and push your code**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Vocabulary game for Maayan"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/vocab-game.git
   git push -u origin main
   ```

### Deploying Updates

Whenever you want to deploy changes:

```bash
npm run deploy
```

This will:
1. Build the production version
2. Push it to the `gh-pages` branch
3. Make it live at your GitHub Pages URL

**First deployment takes 2-5 minutes. After that, updates appear within 1 minute.**

### Accessing Your Game

After deployment, visit:
```
https://YOUR_GITHUB_USERNAME.github.io/vocab-game
```

Share this link with Maayan so she can play from anywhere! 🎉

## 📱 Mobile Access

The game is fully responsive and works great on:
- Smartphones (iOS and Android)
- Tablets
- Desktop browsers

Simply share the GitHub Pages URL and play from any device!

## 🎨 Customization

### Changing Colors

The game uses Tailwind CSS. To customize colors, edit `src/VocabGame.jsx` and look for color classes like:
- `bg-purple-400` (background purple)
- `from-pink-400` (gradient pink)
- `text-yellow-500` (yellow text)

### Adjusting Number of Questions

In `src/VocabGame.jsx`, line 65, change `20` to your desired number:
```javascript
const maxRounds = Math.min(20, shuffled.length * 2);
```

### Modifying Sample Words

Edit the `sampleWords` array in `src/VocabGame.jsx` (lines 18-24) to change the default vocabulary.

## 🗂️ Project Structure

```
EnglishTest/
├── public/                  # Static files
│   ├── index.html          # Main HTML file
│   ├── manifest.json       # PWA manifest
│   └── robots.txt          # SEO file
├── src/                    # Source code
│   ├── App.js              # Main app wrapper
│   ├── VocabGame.jsx       # Game component (all logic)
│   ├── index.js            # React entry point
│   └── index.css           # Global styles + Tailwind
├── .gitignore              # Git ignore rules
├── package.json            # Dependencies and scripts
├── postcss.config.js       # PostCSS configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── README.md               # This file!
```

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start development server (localhost:3000) |
| `npm run build` | Create production build |
| `npm run deploy` | Deploy to GitHub Pages |
| `npm test` | Run tests (if any) |

## 🐛 Troubleshooting

### "npm not found"
Install Node.js from [nodejs.org](https://nodejs.org/)

### Port 3000 already in use
```bash
# Windows PowerShell
Stop-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess -Force
```

### GitHub Pages shows 404
- Check the `homepage` URL in `package.json` matches your GitHub username
- Wait 2-5 minutes after first deployment
- Ensure repository settings → Pages is set to `gh-pages` branch

### CSV not loading
- Ensure UTF-8 encoding
- Check first line is exactly: `English,Hebrew`
- No blank lines at the end of the file

### Hebrew text not displaying correctly
- Make sure your CSV is saved as UTF-8 encoding
- Use a text editor that supports UTF-8 (like VS Code, Notepad++)

## 📊 Leaderboard Data

The leaderboard is stored in your browser's localStorage under the key `vocabLeaderboard`.

To reset the leaderboard:
1. Open browser Developer Tools (F12)
2. Go to "Console" tab
3. Type: `localStorage.removeItem('vocabLeaderboard')`
4. Press Enter
5. Refresh the page

## 🎯 Tips for Maayan

- Try to beat your high score!
- Upload different word lists to practice different topics
- Play daily to improve your vocabulary
- Challenge friends or family to beat your score
- The leaderboard saves your progress, so you can always see your improvement

## 💡 Future Enhancements

Ideas for future improvements:
- Add sound effects
- Timer mode for extra challenge
- Different difficulty levels
- Achievement badges
- Dark mode toggle
- Export leaderboard to CSV

## 📄 License

This project is created for personal/educational use.

## 🤝 Contributing

Feel free to fork this project and customize it for your own vocabulary learning needs!

---

**Made with ❤️ for Maayan's English learning journey** 🌟

*Happy Learning!* 📚✨

