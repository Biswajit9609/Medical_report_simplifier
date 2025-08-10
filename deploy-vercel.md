# Vercel Deployment Guide

## Prerequisites
- Vercel account (free at vercel.com)
- Git repository (GitHub, GitLab, or Bitbucket)

## Step 1: Install Vercel CLI
```bash
npm install -g vercel
vercel login
```

## Step 2: Push Code to Git Repository
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/medical-report-analyzer.git
git push -u origin main
```

## Step 3: Deploy to Vercel

### Option A: Using Vercel CLI
```bash
vercel
# Follow the prompts
# Set build command: npm run vercel-build
# Set output directory: dist
```

### Option B: Using Vercel Dashboard
1. Go to vercel.com
2. Click "New Project"
3. Import your Git repository
4. Set build settings:
   - Build Command: `npm run vercel-build`
   - Output Directory: `dist`
5. Add environment variable:
   - `REACT_APP_API_URL`: Your Lambda API Gateway URL

## Step 4: Configure Environment Variables
In Vercel Dashboard:
1. Go to Project Settings
2. Environment Variables
3. Add: `REACT_APP_API_URL` = `https://your-lambda-api-url.amazonaws.com/dev/caption`

## Step 5: Redeploy
After adding environment variables, trigger a new deployment:
```bash
vercel --prod
```

Your app will be available at: `https://your-project-name.vercel.app`