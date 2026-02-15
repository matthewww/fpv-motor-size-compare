# Deployment Guide

This guide explains how to deploy the FPV Motor Size Comparison Tool to GitHub Pages.

## Prerequisites

- A GitHub account
- Repository with the code pushed to the `main` branch
- Node.js 20 or higher installed locally (for testing)

## GitHub Pages Setup

The deployment workflow is already configured in `.github/workflows/deploy.yml`. However, **you must enable GitHub Pages in your repository settings** before the first deployment can succeed.

### Step 1: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** (top navigation)
3. In the left sidebar, click on **Pages** (under "Code and automation")
4. Under **Build and deployment**:
   - **Source**: Select **GitHub Actions** from the dropdown
   - This tells GitHub to use the workflow file instead of deploying from a branch
5. Click **Save** if prompted

### Step 2: Trigger the Deployment

Once GitHub Pages is enabled, you can trigger a deployment by:

**Option A: Push to main branch**
```bash
git push origin main
```

**Option B: Manual trigger**
1. Go to the **Actions** tab in your repository
2. Click on the "Deploy to GitHub Pages" workflow
3. Click the **Run workflow** button
4. Select the `main` branch
5. Click **Run workflow**

### Step 3: Wait for Deployment

1. Go to the **Actions** tab to monitor the workflow progress
2. The workflow has two jobs:
   - **build**: Installs dependencies and builds the application
   - **deploy**: Deploys the built application to GitHub Pages
3. Once both jobs complete successfully (green checkmarks), your site will be live

### Step 4: Access Your Site

Your site will be available at:
```
https://<your-username>.github.io/fpv-motor-size-compare/
```

For example: https://matthewww.github.io/fpv-motor-size-compare/

## Troubleshooting

### Error: "Failed to create deployment (status: 404)"

**Cause**: GitHub Pages has not been enabled in the repository settings.

**Solution**: Follow Step 1 above to enable GitHub Pages with "GitHub Actions" as the source.

### Error: "Not Found" or 404 on deployed site

**Cause**: The `base` path in `vite.config.js` doesn't match the repository name.

**Solution**: 
1. Open `vite.config.js`
2. Ensure the `base` value matches your repository name:
   ```javascript
   base: '/your-repository-name/'
   ```
3. Commit and push the change

### Deployment succeeds but site shows blank page

**Cause**: The `base` path might be incorrect or assets are not loading.

**Solution**:
1. Check browser console for errors (F12)
2. Verify the `base` path in `vite.config.js` matches your repository name
3. Ensure the repository name uses lowercase and hyphens (not spaces or special characters)

### Build fails with dependency errors

**Cause**: Package versions may be incompatible or `package-lock.json` is out of sync.

**Solution**:
```bash
# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall dependencies
npm install

# Test locally
npm run build

# Commit the new package-lock.json
git add package-lock.json
git commit -m "Update package-lock.json"
git push
```

## Local Testing Before Deployment

Always test your changes locally before deploying:

```bash
# Install dependencies (first time only)
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Visit `http://localhost:5173` (dev) or `http://localhost:4173` (preview) to test the application.

## Workflow Configuration

The deployment workflow (`.github/workflows/deploy.yml`) is configured to:

- **Trigger**: Automatically on push to `main` branch or manually via workflow_dispatch
- **Permissions**: 
  - `contents: read` - Read repository contents
  - `pages: write` - Deploy to GitHub Pages
  - `id-token: write` - Required for secure deployment
- **Concurrency**: Only one deployment at a time, canceling in-progress deployments for new ones
- **Jobs**:
  1. **build**: Checkout code, setup Node.js 20, install dependencies, build, upload artifact
  2. **deploy**: Deploy the artifact to GitHub Pages

## Custom Domain (Optional)

To use a custom domain:

1. Add a `CNAME` file to the `public` folder with your domain:
   ```
   example.com
   ```
2. Update `vite.config.js` to use root path:
   ```javascript
   base: '/'
   ```
3. Configure DNS settings with your domain provider
4. Enable HTTPS in GitHub Pages settings (recommended)

## Updating the Deployment

Every push to the `main` branch automatically triggers a new deployment. The process:

1. Developer pushes code to `main`
2. GitHub Actions workflow starts
3. Application is built
4. Built files are deployed to GitHub Pages
5. Site is updated (usually within 1-2 minutes)

## Security Notes

- The workflow uses `GITHUB_TOKEN` which is automatically provided by GitHub Actions
- No additional secrets or tokens need to be configured
- The token has minimal permissions (read contents, write pages)
- All deployments are logged and auditable in the Actions tab

## Cost

GitHub Pages is **free** for public repositories with:
- 1 GB storage
- 100 GB bandwidth per month
- 10 builds per hour

For private repositories, GitHub Pages requires a paid GitHub plan.
