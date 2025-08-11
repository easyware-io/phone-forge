# 🚀 GitHub Actions Workflows Setup Guide

This directory contains GitHub Actions workflows for automating the Phone Forge library's CI/CD pipeline. Here's what each workflow does and how to set them up.

## 📁 Workflow Files

### 1. `ci.yml` - Continuous Integration

**Triggers:** Push/PR to main or develop branches  
**Purpose:** Runs tests, validation, and security checks

**Features:**

- ✅ Multi-platform testing (Ubuntu, Windows, macOS)
- ✅ Multi-version Node.js testing (16, 18, 20, 22)
- ✅ Security auditing
- ✅ Database validation
- ✅ Package installation testing
- ✅ TypeScript validation

### 2. `release.yml` - Automated Release

**Triggers:** Git tags matching `v*.*.*` pattern  
**Purpose:** Creates GitHub releases and publishes to NPM

**Features:**

- ✅ Version validation
- ✅ Comprehensive testing
- ✅ Automatic changelog generation
- ✅ GitHub release creation
- ✅ NPM publication
- ✅ Publication verification

### 3. `publish.yml` - Manual Publishing

**Triggers:** Manual workflow dispatch  
**Purpose:** Manually trigger version bumps and publishing

**Features:**

- ✅ Interactive version selection (patch/minor/major/prerelease)
- ✅ Dry run capability
- ✅ Automatic version bumping
- ✅ Database metadata updates
- ✅ Git tagging
- ✅ Full release pipeline

## 🔧 Setup Instructions

### 1. Repository Secrets

Add these secrets in your GitHub repository (`Settings > Secrets and variables > Actions`):

#### Required Secrets:

```
NPM_TOKEN - Your NPM automation token
```

#### How to create NPM_TOKEN:

1. Go to [npmjs.com](https://www.npmjs.com/) and log in
2. Click your profile → "Access Tokens"
3. Click "Generate New Token
