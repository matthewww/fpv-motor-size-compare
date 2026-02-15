# GitHub Pages Setup - Quick Reference

This is a quick reference guide to fix the deployment failure. For detailed instructions, see [DEPLOYMENT.md](../DEPLOYMENT.md).

## The Issue

The GitHub Actions workflow is failing with:
```
Error: Failed to create deployment (status: 404)
Ensure GitHub Pages has been enabled: https://github.com/matthewww/fpv-motor-size-compare/settings/pages
```

## The Fix (3 Steps)

### Step 1: Enable GitHub Pages
1. Navigate to: **Settings** → **Pages**
2. Under "Build and deployment", set **Source** to: **GitHub Actions**
3. Save (if prompted)

### Step 2: Re-run the Failed Workflow
1. Go to the **Actions** tab
2. Click on the failed workflow run
3. Click **Re-run all jobs**

### Step 3: Verify Deployment
- The workflow should now complete successfully
- Your site will be available at: `https://<username>.github.io/fpv-motor-size-compare/`

## Why This Happened

The workflow configuration is correct, but GitHub Pages must be manually enabled in repository settings before the first deployment can succeed. This is a one-time setup requirement.

## Still Having Issues?

See the full [DEPLOYMENT.md](../DEPLOYMENT.md) guide for:
- Detailed troubleshooting steps
- Local testing instructions
- Custom domain configuration
- Security and cost information
