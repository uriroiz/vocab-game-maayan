# PowerShell script to set up GitHub for the Vocabulary Game
# Run this script to initialize Git and prepare for GitHub push

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  GitHub Setup for Vocabulary Game" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Git is installed
try {
    $gitVersion = git --version
    Write-Host "✓ Git found: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Git not found! Please install Git first." -ForegroundColor Red
    Write-Host "  Download from: https://git-scm.com/download/win" -ForegroundColor Yellow
    exit 1
}

# Check if already a Git repository
if (Test-Path .git) {
    Write-Host "⚠ Git repository already initialized" -ForegroundColor Yellow
    $continue = Read-Host "Continue anyway? (y/n)"
    if ($continue -ne 'y') {
        exit 0
    }
} else {
    Write-Host "Initializing Git repository..." -ForegroundColor Cyan
    git init
}

# Add all files
Write-Host ""
Write-Host "Adding files to Git..." -ForegroundColor Cyan
git add .

# Check if there are changes to commit
$status = git status --porcelain
if ($status) {
    Write-Host ""
    $commitMessage = Read-Host "Enter commit message (or press Enter for default)"
    if ([string]::IsNullOrWhiteSpace($commitMessage)) {
        $commitMessage = "Initial commit - Vocabulary game for Maayan"
    }
    
    git commit -m $commitMessage
    Write-Host "✓ Files committed" -ForegroundColor Green
} else {
    Write-Host "✓ No changes to commit" -ForegroundColor Green
}

# Set main branch
Write-Host ""
Write-Host "Setting main branch..." -ForegroundColor Cyan
git branch -M main

# Ask for GitHub repository URL
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  GitHub Repository Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Before continuing:" -ForegroundColor Yellow
Write-Host "1. Create a new repository on GitHub.com" -ForegroundColor Yellow
Write-Host "2. Copy the repository URL (it looks like:)" -ForegroundColor Yellow
Write-Host "   https://github.com/YOUR_USERNAME/vocab-game-maayan.git" -ForegroundColor Cyan
Write-Host ""
$repoUrl = Read-Host "Paste your GitHub repository URL here"

if ([string]::IsNullOrWhiteSpace($repoUrl)) {
    Write-Host "⚠ No URL provided. Skipping remote setup." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "To add remote later, run:" -ForegroundColor Cyan
    Write-Host "  git remote add origin YOUR_REPO_URL" -ForegroundColor White
    Write-Host "  git push -u origin main" -ForegroundColor White
    exit 0
}

# Check if remote already exists
$existingRemote = git remote get-url origin 2>$null
if ($existingRemote) {
    Write-Host ""
    Write-Host "⚠ Remote 'origin' already exists: $existingRemote" -ForegroundColor Yellow
    $replace = Read-Host "Replace it with new URL? (y/n)"
    if ($replace -eq 'y') {
        git remote set-url origin $repoUrl
        Write-Host "✓ Remote updated" -ForegroundColor Green
    }
} else {
    git remote add origin $repoUrl
    Write-Host "✓ Remote added" -ForegroundColor Green
}

# Ask if user wants to push now
Write-Host ""
$pushNow = Read-Host "Push to GitHub now? (y/n)"
if ($pushNow -eq 'y') {
    Write-Host ""
    Write-Host "Pushing to GitHub..." -ForegroundColor Cyan
    Write-Host "(You may need to enter your GitHub credentials)" -ForegroundColor Yellow
    Write-Host ""
    git push -u origin main
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "========================================" -ForegroundColor Green
        Write-Host "  ✓ Successfully pushed to GitHub!" -ForegroundColor Green
        Write-Host "========================================" -ForegroundColor Green
        Write-Host ""
        Write-Host "Next steps:" -ForegroundColor Cyan
        Write-Host "1. Go to Vercel.com and sign up" -ForegroundColor White
        Write-Host "2. Import your GitHub repository" -ForegroundColor White
        Write-Host "3. Deploy! See DEPLOYMENT_HEBREW.md for details" -ForegroundColor White
    } else {
        Write-Host ""
        Write-Host "⚠ Push failed. Common issues:" -ForegroundColor Yellow
        Write-Host "  - Authentication: Use Personal Access Token instead of password" -ForegroundColor Yellow
        Write-Host "  - Network: Check your internet connection" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "You can push manually later with:" -ForegroundColor Cyan
        Write-Host "  git push -u origin main" -ForegroundColor White
    }
} else {
    Write-Host ""
    Write-Host "To push later, run:" -ForegroundColor Cyan
    Write-Host "  git push -u origin main" -ForegroundColor White
}

Write-Host ""
Write-Host "Setup complete! 🎉" -ForegroundColor Green

