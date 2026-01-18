# CI/CD Pipeline Setup Guide

This guide will help you set up the GitHub Actions pipeline for automatic deployment to Vercel.

## Prerequisites

1. GitHub repository created and code pushed
2. Vercel account created
3. Project deployed on Vercel (at least once manually)

## Step 1: Get Vercel Credentials

### Get Vercel Token
1. Go to https://vercel.com/account/tokens
2. Click "Create Token"
3. Name it: `GitHub Actions`
4. Copy the token (you'll only see it once!)

### Get Vercel Project ID and Org ID
1. Install Vercel CLI if you haven't:
   ```bash
   npm install -g vercel
   ```

2. Link your project:
   ```bash
   cd /path/to/the-findery
   vercel link
   ```

3. Get your IDs:
   ```bash
   cat .vercel/project.json
   ```
   
   You'll see something like:
   ```json
   {
     "orgId": "team_xxxxxxxxxxxxx",
     "projectId": "prj_xxxxxxxxxxxxx"
   }
   ```

## Step 2: Add GitHub Secrets

Go to your GitHub repository settings:
`https://github.com/YOUR_USERNAME/the-findery/settings/secrets/actions`

Add these secrets by clicking "New repository secret":

### Required Secrets:

1. **VERCEL_TOKEN**
   - Value: The token you created in Step 1

2. **VERCEL_ORG_ID**
   - Value: The `orgId` from `.vercel/project.json`

3. **VERCEL_PROJECT_ID**
   - Value: The `projectId` from `.vercel/project.json`

4. **REACT_APP_SUPABASE_URL**
   - Value: Your Supabase project URL

5. **REACT_APP_SUPABASE_ANON_KEY**
   - Value: Your Supabase anonymous key

### Optional Secrets (if using Beehiv):

6. **REACT_APP_BEEHIV_API_KEY**
   - Value: Your Beehiv API key

7. **REACT_APP_BEEHIV_PUBLICATION_ID**
   - Value: Your Beehiv publication ID

## Step 3: Test the Pipeline

1. Push code to main branch:
   ```bash
   git add .
   git commit -m "Add CI/CD pipeline"
   git push
   ```

2. Watch the pipeline run:
   - Go to `https://github.com/YOUR_USERNAME/the-findery/actions`
   - You should see a workflow running
   - It will lint → build → deploy

## Pipeline Workflow

```
┌─────────────────────────────────────────────┐
│  1. Lint and Build Check (runs on all PRs) │
├─────────────────────────────────────────────┤
│  • Checkout code                            │
│  • Install dependencies                     │
│  • Run ESLint                               │
│  • TypeScript type check                    │
│  • Build production bundle                  │
│  • Upload build artifacts                   │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│  2. Deploy to Vercel (only on main branch)  │
├─────────────────────────────────────────────┤
│  • Checkout code                            │
│  • Deploy to Vercel production             │
└─────────────────────────────────────────────┘
```

## What Happens on Each Push?

### Push to Main Branch:
1. ✅ Linting check
2. ✅ TypeScript check
3. ✅ Build check
4. ✅ Deploy to Vercel production

### Push to PR/Feature Branch:
1. ✅ Linting check
2. ✅ TypeScript check
3. ✅ Build check
4. ❌ Skip deployment

## Troubleshooting

### Build fails with missing environment variables
- Make sure all secrets are added in GitHub repository settings
- Secret names must match exactly (case-sensitive)

### Vercel deployment fails
- Verify `VERCEL_TOKEN`, `VERCEL_ORG_ID`, and `VERCEL_PROJECT_ID` are correct
- Make sure the Vercel project exists (deploy manually once first)

### TypeScript errors
- Run `npm run build` locally to see the same errors
- Fix TypeScript errors before pushing

## Local Testing

Before pushing, test locally:

```bash
# Run linting
npm run lint

# Run type check
npx tsc --noEmit

# Run build
npm run build
```

All should pass before pushing to avoid CI failures.
