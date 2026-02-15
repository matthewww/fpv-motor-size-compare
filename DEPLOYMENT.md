# GitHub Pages Deployment Setup

This document explains how to configure GitHub Pages for this repository.

## Issue

The GitHub Actions workflow for deploying to GitHub Pages is failing with a 404 error:
```
Error: Failed to create deployment (status: 404)
Ensure GitHub Pages has been enabled
```

## Solution

GitHub Pages needs to be enabled in the repository settings **before** the workflow can deploy successfully.

### Step 1: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** (gear icon at the top)
3. In the left sidebar, click on **Pages** (under "Code and automation")
4. Under "Build and deployment", configure:
   - **Source**: Select "GitHub Actions"
   - This allows the workflow to deploy directly

### Step 2: Verify Workflow Permissions

The workflow file (`.github/workflows/deploy.yml`) already has the correct permissions:
```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

### Step 3: Trigger Deployment

Once GitHub Pages is configured:

1. Push a commit to the `main` branch, OR
2. Go to Actions → "Deploy to GitHub Pages" → Click "Run workflow"

The deployment should succeed, and your site will be available at:
```
https://matthewww.github.io/fpv-motor-size-compare/
```

## Verifying the Setup

After enabling GitHub Pages:

1. Go to **Settings** → **Pages**
2. You should see a message like: "Your site is ready to be published at https://matthewww.github.io/fpv-motor-size-compare/"
3. The GitHub Actions workflow will automatically deploy on the next push to `main`

## Troubleshooting

### 404 Error During Deployment
- **Cause**: GitHub Pages is not enabled or not configured to use GitHub Actions
- **Fix**: Follow Step 1 above to enable GitHub Pages with "GitHub Actions" as the source

### Build Succeeds but Deploy Fails
- **Cause**: Missing Pages permissions
- **Fix**: Ensure the workflow has `pages: write` and `id-token: write` permissions (already configured)

### Site Not Loading After Deployment
- **Cause**: Incorrect base path in `vite.config.js`
- **Fix**: Ensure `base: '/fpv-motor-size-compare/'` matches your repository name (already configured)

## Related Files

- `.github/workflows/deploy.yml` - GitHub Actions workflow
- `vite.config.js` - Vite configuration with base path
- `package.json` - Build scripts

## Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Deploying Vite to GitHub Pages](https://vitejs.dev/guide/static-deploy.html#github-pages)
