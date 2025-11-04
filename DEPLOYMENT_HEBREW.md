# 🚀 מדריך פרסום - GitHub ו-Vercel

מדריך זה יעזור לך לפרסם את המשחק של מעיין ב-GitHub ואז ב-Vercel, כך שהיא תוכל לשחק בלי להעלות קובץ בכל פעם.

## ✅ מה כבר הוגדר:

- ✅ רשימת המילים נטענת אוטומטית מהקובץ `English-Hebrew-Words-No-Duplicates.csv`
- ✅ המשחק מוכן לפרסום ב-Vercel
- ✅ קובץ ה-CSV נמצא בתיקיית `public` כך שיהיה נגיש

---

## 📋 שלב 1: פרסום ל-GitHub

### 1.1 יצירת Repository חדש ב-GitHub

1. היכנס ל-[GitHub.com](https://github.com)
2. לחץ על הכפתור **"+"** (מימין למעלה) → **"New repository"**
3. מלא את הפרטים:
   - **Repository name**: `vocab-game-maayan` (או כל שם שתרצה)
   - **Description**: "משחק אוצר מילים אנגלית-עברית למעיין"
   - בחר **Public** או **Private** (לפי העדפה)
   - **אל תסמן** "Initialize with README" (כי כבר יש לנו קבצים)
4. לחץ **"Create repository"**

**⚠️ חשוב:** העתק את כתובת ה-URL של ה-repository. היא נראית כך:
```
https://github.com/YOUR_USERNAME/vocab-game-maayan.git
```

---

### 1.2 הגדרת Git בפרויקט

פתח PowerShell בתיקיית הפרויקט והרץ:

```powershell
# אתחול Git
git init

# הוסף את כל הקבצים
git add .

# צור commit ראשון
git commit -m "Initial commit - Vocabulary game for Maayan"

# הגדר את ה-branch הראשי
git branch -M main

# חבר ל-GitHub (החלף ב-URL שלך)
git remote add origin https://github.com/YOUR_USERNAME/vocab-game-maayan.git

# העלה את הקוד
git push -u origin main
```

**אם תתבקש להתחבר:**
- השתמש ב-**Personal Access Token** במקום סיסמה
- אם אין לך: GitHub → Settings → Developer settings → Personal access tokens → Generate new token
- תן הרשאות: `repo` (כל ההרשאות)

---

## 📋 שלב 2: פרסום ב-Vercel

### 2.1 יצירת חשבון ב-Vercel

1. היכנס ל-[Vercel.com](https://vercel.com)
2. לחץ **"Sign Up"**
3. בחר **"Continue with GitHub"** (הכי קל)
4. אשר את ההרשאות

---

### 2.2 חיבור הפרויקט

1. ב-Vercel, לחץ **"Add New Project"**
2. בחר את ה-repository שיצרת: `vocab-game-maayan`
3. Vercel יזהה אוטומטית שזה React project
4. **אל תשנה כלום** - ההגדרות כבר נכונות:
   - Framework Preset: Create React App
   - Build Command: `npm run build`
   - Output Directory: `build`
5. לחץ **"Deploy"**

---

### 2.3 המתן לפרסום

- Vercel יבנה את הפרויקט (2-3 דקות)
- בסוף תקבל **קישור** כמו: `https://vocab-game-maayan.vercel.app`
- הקישור הזה הוא המשחק החי!

---

## 🎉 זהו! המשחק פורסם!

### מה עכשיו?

1. **שתף את הקישור** עם מעיין
2. היא יכולה לשחק **בלי להעלות קובץ** - המילים כבר נטענות אוטומטית
3. המשחק עובד על **טלפון, טאבלט ומחשב**
4. **Leaderboard** נשמר בכל מכשיר בנפרד

---

## 🔄 עדכון המשחק

כשאתה רוצה לעדכן את המשחק (למשל, להוסיף מילים חדשות):

1. **ערוך את הקבצים** במחשב
2. **העתק את הקובץ העדכני** ל-`public`:
   ```powershell
   Copy-Item "English-Hebrew-Words-No-Duplicates.csv" -Destination "public\English-Hebrew-Words-No-Duplicates.csv" -Force
   ```
3. **Commit ו-push**:
   ```powershell
   git add .
   git commit -m "Updated word list"
   git push
   ```
4. **Vercel יעדכן אוטומטית** תוך דקה-שתיים!

---

## 📝 עדכון רשימת המילים

### איך להוסיף מילים חדשות:

1. פתח את `English-Hebrew-Words-No-Duplicates.csv`
2. הוסף שורות חדשות בפורמט:
   ```csv
   English,Hebrew
   new word,מילה חדשה
   ```
3. העתק את הקובץ ל-`public`:
   ```powershell
   Copy-Item "English-Hebrew-Words-No-Duplicates.csv" -Destination "public\English-Hebrew-Words-No-Duplicates.csv" -Force
   ```
4. Commit ו-push (כמו למעלה)

---

## 🆘 פתרון בעיות

### הבעיה: "Cannot find module"
**פתרון:** הרץ `npm install` לפני ה-push

### הבעיה: Vercel build נכשל
**פתרון:** בדוק שיש קובץ `vercel.json` בתיקיית השורש

### הבעיה: המילים לא נטענות
**פתרון:** ודא שהקובץ `English-Hebrew-Words-No-Duplicates.csv` נמצא בתיקיית `public`

### הבעיה: GitHub לא מזהה את הקבצים
**פתרון:** ודא ש-`.gitignore` לא חוסם קבצים חשובים

---

## 📱 גישה מהירה

### להוסיף למסך הבית (טלפון/טאבלט):

1. פתח את הקישור ב-Vercel בדפדפן
2. לחץ על תפריט הדפדפן (⋮ או ⋯)
3. בחר **"Add to Home Screen"** או **"הוסף למסך הבית"**
4. עכשיו המשחק עובד כמו אפליקציה!

---

## 🎯 סיכום

| שלב | מה לעשות | זמן |
|-----|----------|-----|
| 1 | יצירת repository ב-GitHub | 2 דקות |
| 2 | Push קוד ל-GitHub | 3 דקות |
| 3 | חיבור ל-Vercel | 2 דקות |
| 4 | Deploy ב-Vercel | 3-5 דקות |
| **סה"כ** | | **~10 דקות** |

---

## 🌟 טיפים

- ✅ **שמור את הקישור** של Vercel במקום נגיש
- ✅ **עדכן את המילים** באופן קבוע כדי שהמשחק יישאר מעניין
- ✅ **בדוק את המשחק** על טלפון לפני שתשתף עם מעיין
- ✅ **Leaderboard** נשמר בכל מכשיר בנפרד - זה תקין!

---

**המשחק מוכן! מעיין יכולה להתחיל לשחק! 🎮✨**

---

*שאלות? בדוק את `DEPLOYMENT.md` (באנגלית) למדריך מפורט יותר.*

