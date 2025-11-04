# 📦 Deployment Guide - Step by Step

This guide walks you through deploying the Vocabulary Game to GitHub Pages so Maayan can access it online from anywhere.

## 🎯 Overview

**What we'll do:**
1. Create a GitHub account (if you don't have one)
2. Create a new repository
3. Configure the project for deployment
4. Push code to GitHub
5. Deploy to GitHub Pages
6. Access the live game

**Time needed:** 15-20 minutes (first time)

---

## Step 1: Create GitHub Account

If you don't have a GitHub account:

1. Go to [github.com](https://github.com)
2. Click "Sign up"
3. Follow the registration steps
4. Verify your email address

**Write down your username - you'll need it!**

---

## Step 2: Install Git

Check if Git is installed:

```powershell
git --version
```

If not installed:
1. Download from [git-scm.com](https://git-scm.com/download/win)
2. Run the installer (use default settings)
3. Restart your terminal/PowerShell

---

## Step 3: Configure Git (First Time Only)

```powershell
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"
```

Use the same email as your GitHub account.

---

## Step 4: Create GitHub Repository

1. Go to [github.com](https://github.com)
2. Log in to your account
3. Click the "+" icon (top right) → "New repository"
4. Fill in:
   - **Repository name**: `vocab-game` (or any name)
   - **Description**: "English-Hebrew vocabulary game for Maayan"
   - **Public** or **Private**: Choose based on preference
   - **DO NOT** check "Initialize with README" (we already have files)
5. Click "Create repository"

**Important:** Copy the repository URL shown on the next page. It looks like:
```
https://github.com/YOUR_USERNAME/vocab-game.git
```

---

## Step 5: Update package.json

1. Open `package.json` in a text editor
2. Find line 5 (the `homepage` field)
3. Replace `YOUR_GITHUB_USERNAME` with your actual GitHub username
4. Replace `vocab-game` with your repository name (if different)

**Example:**
```json
"homepage": "https://johnsmith.github.io/vocab-game",
```

5. Save the file

---

## Step 6: Initialize Git Repository

Open PowerShell in your project folder:

```powershell
cd C:\Scripts\Kids\Maayan\EnglishTest
```

Initialize Git:

```powershell
git init
```

Add all files:

```powershell
git add .
```

Create your first commit:

```powershell
git commit -m "Initial commit - Vocabulary game for Maayan"
```

---

## Step 7: Connect to GitHub

Link your local repository to GitHub (replace with YOUR repository URL):

```powershell
git remote add origin https://github.com/YOUR_USERNAME/vocab-game.git
```

Set the main branch:

```powershell
git branch -M main
```

---

## Step 8: Push Code to GitHub

Push your code:

```powershell
git push -u origin main
```

**You may be prompted to log in to GitHub.** Enter your credentials.

**If using 2FA:** You'll need a Personal Access Token instead of your password:
1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token (classic)
3. Give it a name: "vocab-game-deployment"
4. Check: `repo` (all repo permissions)
5. Generate token and copy it
6. Use this token as your password when pushing

---

## Step 9: Install Dependencies

If you haven't already:

```powershell
npm install
```

This installs all necessary packages including `gh-pages` for deployment.

---

## Step 10: Deploy to GitHub Pages

Run the deployment command:

```powershell
npm run deploy
```

This will:
1. Build the production version
2. Create a `gh-pages` branch
3. Push the built files to that branch
4. Make it live on GitHub Pages

**Wait 2-5 minutes for the first deployment to go live.**

---

## Step 11: Enable GitHub Pages (First Time)

1. Go to your repository on GitHub
2. Click "Settings" tab
3. Scroll down to "Pages" in the left sidebar
4. Under "Source", ensure it says:
   - Branch: `gh-pages`
   - Folder: `/ (root)`
5. Click "Save" if needed

**Your site will be published at:**
```
https://YOUR_USERNAME.github.io/vocab-game
```

---

## Step 12: Access Your Game

After 2-5 minutes, visit:
```
https://YOUR_USERNAME.github.io/vocab-game
```

**Bookmark this URL** and share it with Maayan! 🎉

---

## 🔄 Updating the Deployed Game

Whenever you make changes to the code:

1. **Save your changes**

2. **Test locally**:
   ```powershell
   npm start
   ```

3. **Commit changes**:
   ```powershell
   git add .
   git commit -m "Description of what you changed"
   ```

4. **Push to GitHub**:
   ```powershell
   git push
   ```

5. **Deploy update**:
   ```powershell
   npm run deploy
   ```

Updates typically appear within 1 minute.

---

## 🛠️ Common Issues & Solutions

### Issue: "Permission denied" when pushing

**Solution:**
- Use a Personal Access Token instead of your password
- See Step 8 for instructions

### Issue: 404 Page Not Found after deployment

**Solutions:**
- Check `homepage` in `package.json` matches your GitHub username/repo
- Wait 5 minutes (first deployment takes time)
- Check GitHub repository settings → Pages is set to `gh-pages` branch

### Issue: "gh-pages not found"

**Solution:**
```powershell
npm install gh-pages --save-dev
```

### Issue: Hebrew characters show as gibberish

**Solution:**
- Save CSV files as UTF-8 encoding
- Use an editor like VS Code or Notepad++ (not regular Notepad)

### Issue: Changes not showing on live site

**Solutions:**
1. Clear browser cache (Ctrl+Shift+Delete)
2. Try incognito/private browsing mode
3. Check you ran `npm run deploy` (not just `npm run build`)

---

## 📋 Deployment Checklist

Use this checklist for your first deployment:

- [ ] GitHub account created
- [ ] Git installed on computer
- [ ] Git configured with name and email
- [ ] GitHub repository created
- [ ] `package.json` homepage field updated with correct username/repo
- [ ] `npm install` completed successfully
- [ ] Git initialized in project folder
- [ ] Code committed to Git
- [ ] Remote origin added
- [ ] Code pushed to GitHub
- [ ] `npm run deploy` completed successfully
- [ ] GitHub Pages enabled in repository settings
- [ ] Site accessible at GitHub Pages URL
- [ ] Bookmark created for easy access

---

## 🎓 Quick Reference Commands

```powershell
# Test locally
npm start

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy

# Check Git status
git status

# Commit changes
git add .
git commit -m "Your message here"

# Push to GitHub
git push

# View commit history
git log --oneline
```

---

## 🌐 Sharing the Game

Once deployed, you can:

1. **Share the URL** directly:
   ```
   https://YOUR_USERNAME.github.io/vocab-game
   ```

2. **Create a QR code** (for mobile devices):
   - Use a free QR code generator online
   - Print it out so Maayan can scan and play on her tablet

3. **Add to home screen** (mobile):
   - Open the URL in mobile browser
   - Tap "Add to Home Screen"
   - Now it works like an app!

---

## 💾 Backup Your Work

**Important:** Always keep backups!

1. Your code is safe on GitHub (automatic backup)
2. Keep a local copy in `C:\Scripts\Kids\Maayan\EnglishTest`
3. Consider backing up your CSV word lists separately

---

## 🎉 Success!

Once you see the game running at your GitHub Pages URL:

✅ **Deployment complete!**  
✅ **Accessible from anywhere with internet**  
✅ **Works on mobile devices**  
✅ **Automatically saved on GitHub**

**Now Maayan can practice vocabulary from anywhere!** 🚀

---

**Need help?** Check the main README.md for more information or troubleshooting tips.

*Happy deploying!* 🌟

