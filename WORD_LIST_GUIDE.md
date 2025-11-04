# 📝 Creating Custom Word Lists

This guide shows you how to create and manage custom vocabulary lists for the game.

## 📄 CSV File Format

The game accepts CSV (Comma-Separated Values) files with this exact format:

```csv
English,Hebrew
pencil,עיפרון
book,ספר
teacher,מורה
train,רכבת
happy,שמח
```

### Rules:

1. **First line MUST be the header**: `English,Hebrew`
2. **One word pair per line**
3. **Format**: `English word,Hebrew word`
4. **No quotes needed** (unless the word contains a comma)
5. **No extra spaces** before or after commas
6. **Save as UTF-8** encoding (important for Hebrew characters)

## ✅ Good Examples

```csv
English,Hebrew
apple,תפוח
orange,תפוז
banana,בננה
grape,ענב
watermelon,אבטיח
```

```csv
English,Hebrew
happy,שמח
sad,עצוב
angry,כועס
excited,נרגש
tired,עייף
```

```csv
English,Hebrew
cat,חתול
dog,כלב
bird,ציפור
fish,דג
horse,סוס
```

## ❌ Common Mistakes

### ❌ Missing Header
```csv
apple,תפוח
orange,תפוז
```
**Problem:** First line should be `English,Hebrew`

### ❌ Extra Spaces
```csv
English , Hebrew
apple , תפוח
```
**Problem:** Spaces around commas will cause issues

### ❌ Wrong Separator
```csv
English;Hebrew
apple;תפוח
```
**Problem:** Use comma (`,`) not semicolon (`;`)

### ❌ Multiple Words Without Quotes
```csv
English,Hebrew
ice cream,גלידה
```
**This is OK!** But if you have commas IN the words, use quotes:
```csv
English,Hebrew
"hello, friend",שלום חבר
```

## 🛠️ Creating Your CSV File

### Method 1: Using Excel or Google Sheets

1. **Create a new spreadsheet**
2. **Add headers** in Row 1:
   - Cell A1: `English`
   - Cell B1: `Hebrew`
3. **Add your word pairs** in the rows below
4. **Save/Export as CSV**:
   - **Excel**: File → Save As → Choose "CSV UTF-8 (Comma delimited)" 
   - **Google Sheets**: File → Download → CSV (.csv)
5. **Important**: Make sure to choose UTF-8 encoding!

### Method 2: Using a Text Editor

1. **Open a text editor** (Notepad++, VS Code, or even Notepad)
2. **Type your word list** in the format shown above
3. **Save as**:
   - File name: `my-words.csv`
   - Encoding: **UTF-8** (very important!)
   - Save type: All files (or .csv)

### Method 3: Using the Included Sample

1. **Copy** `English-Hebrew-Words-No-Duplicates.csv`
2. **Rename** the copy
3. **Edit** with Excel, Google Sheets, or text editor
4. **Modify** the word pairs to your needs

## 📚 Suggested Word List Categories

Here are some themed lists you can create:

### 🍎 Food & Drinks
```csv
English,Hebrew
bread,לחם
milk,חלב
water,מים
apple,תפוח
chicken,עוף
rice,אורז
```

### 🏠 Around the House
```csv
English,Hebrew
door,דלת
window,חלון
table,שולחן
chair,כיסא
bed,מיטה
lamp,מנורה
```

### 👕 Clothing
```csv
English,Hebrew
shirt,חולצה
pants,מכנסיים
shoes,נעליים
hat,כובע
dress,שמלה
socks,גרביים
```

### 🎨 Colors
```csv
English,Hebrew
red,אדום
blue,כחול
green,ירוק
yellow,צהוב
black,שחור
white,לבן
```

### 🔢 Numbers
```csv
English,Hebrew
one,אחד
two,שניים
three,שלושה
four,ארבעה
five,חמישה
ten,עשרה
```

### 📅 Days & Months
```csv
English,Hebrew
Sunday,ראשון
Monday,שני
Tuesday,שלישי
Wednesday,רביעי
Thursday,חמישי
Friday,שישי
Saturday,שבת
```

### 🎭 Emotions
```csv
English,Hebrew
happy,שמח
sad,עצוב
angry,כועס
excited,נרגש
scared,מפחד
surprised,מופתע
```

### 🏫 School
```csv
English,Hebrew
book,ספר
pencil,עיפרון
eraser,מחק
ruler,סרגל
backpack,תיק
notebook,מחברת
```

## 📥 How to Use Your Custom List

1. **Save your CSV file** somewhere easy to find (like Desktop or Documents)
2. **Start the game** (`npm start`)
3. **Click "Choose CSV File"** on the home screen
4. **Navigate to your CSV file** and select it
5. **Click "Start Playing!"**

The game will now use your custom word list! 🎉

## 🔍 Verifying Your CSV

### Check Your File:

1. **Open in Notepad** (not Word!) to see the raw format
2. **Verify** it looks like:
   ```
   English,Hebrew
   word1,מילה1
   word2,מילה2
   ```
3. **Check encoding**: If Hebrew shows as strange characters like `×¢×¤×¨×`, the file is not UTF-8

### Test in the Game:

1. Upload your CSV
2. If you see "File loaded successfully! 🎉" - it worked!
3. If nothing happens, check the browser console (F12) for error messages

## 💡 Tips for Creating Great Word Lists

### ✅ Do:
- **Start small** (10-20 words) and expand later
- **Use themed lists** (easier to remember)
- **Mix difficulty levels** (easy and hard words)
- **Include words Maayan is currently learning** in school
- **Keep multiple CSV files** for different topics
- **Update lists** based on Maayan's progress

### ❌ Don't:
- Make lists too long (200+ words can be overwhelming)
- Include multiple meanings in one entry
- Use punctuation marks unless necessary
- Forget to save as UTF-8

## 📊 Recommended List Sizes

- **Beginner**: 20-30 words
- **Intermediate**: 40-60 words  
- **Advanced**: 80-100 words
- **Maximum**: 200 words (game picks 20 random questions each time)

## 🔄 Managing Multiple Lists

Create different files for different purposes:

```
my-word-lists/
├── school-vocab.csv          (Current school vocabulary)
├── daily-words.csv           (Common everyday words)
├── animals.csv               (Animals and pets)
├── food-and-cooking.csv      (Kitchen vocabulary)
├── verbs.csv                 (Action words)
└── advanced-words.csv        (Challenging vocabulary)
```

Switch between them in the game by uploading different files!

## 🎯 Study Strategy

1. **Start with** `school-vocab.csv` (words being taught in class)
2. **Master those** (get 90%+ consistently)
3. **Move to** themed lists (food, colors, etc.)
4. **Combine** mastered lists into one large file
5. **Repeat!**

## 🌟 Sample CSV Templates

### Template 1: Basic Structure
```csv
English,Hebrew
word1,translation1
word2,translation2
word3,translation3
```

### Template 2: With Comments (for your reference)
The game will ignore any extra columns:
```csv
English,Hebrew,Notes
apple,תפוח,fruit
table,שולחן,furniture
run,רוץ,verb
```

## 🆘 Troubleshooting

### Hebrew shows as ���
**Fix**: Save the file as UTF-8 encoding

### "File not loading"
**Fix**: Check that the first line is exactly `English,Hebrew`

### Only showing English or Hebrew
**Fix**: Make sure each line has both words separated by a comma

### Some words missing
**Fix**: Check for blank lines in your CSV file

## 📖 Using the Included Sample

The folder includes **English-Hebrew-Words-No-Duplicates.csv** with a comprehensive word list.

**To customize it:**
1. Open in Excel/Google Sheets
2. Add/remove rows as needed
3. Save as CSV UTF-8
4. Upload to the game

## 🎓 Advanced Tips

### Frequency-Based Learning
Order your words by frequency of use:
- Most common words first
- Less common words later

### Difficulty Progression
Create multiple files:
- `level-1-easy.csv`
- `level-2-medium.csv`
- `level-3-hard.csv`

### Review Lists
Create a "mistakes.csv" file:
- Add words Maayan gets wrong
- Focus practice on those words

---

**Happy list-making!** 📝✨

*The more you practice, the better you'll get!* 🚀

