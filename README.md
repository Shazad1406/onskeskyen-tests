# Ønskeskyen Playwright Tests

This repository contains end-to-end tests for [onskeskyen.dk](https://onskeskyen.dk) using [Playwright](https://playwright.dev/) and [TypeScript](https://www.typescriptlang.org/).

## Purpose

Automated testing of core user flows:

* User sign-up
* Login functionality
* Wishlist creation
* Visual regression of profile page

The project is designed to demonstrate test automation skills with modern tooling.

## ⚙️ Tech Stack

* Playwright with TypeScript
* GitHub Actions (CI)
* Node.js (v18+)

## Project Structure

```
.
├── tests/                  # All test files
│   ├── helpers/            # Shared functions (signup, login, etc.)
│   ├── fixtures.ts         # Reusable login session fixture
│   ├── 01_signup.spec.ts   # Test: user sign-up
│   ├── 02_login.spec.ts    # Test: login flow
│   ├── 03_wishlist.spec.ts # Test: wishlist creation
│   ├── 04_visual.spec.ts   # Test: visual check of profile page
│   ├── 05_loggedin.spec.ts # Test: post-login session
│
├── .github/workflows/     # GitHub Actions CI config
├── playwright.config.ts   # Playwright project settings
├── package.json           # Project dependencies
├── tsconfig.json          # TypeScript config
```

## Getting Started

### Install dependencies

```bash
npm install
```

### Run all tests

```bash
npx playwright test
```

### Run in headed mode with slow motion

```bash
HEADLESS=false npx playwright test --project=Chromium
```

### Update visual snapshots

```bash
npx playwright test tests/04_visual.spec.ts --update-snapshots
```

## Highlights

* Full cross-browser coverage: Chromium, Firefox, WebKit
* Robust login/signup automation
* Cookie banner handling
* CI integrated via GitHub Actions

## CI Status

GitHub Actions will run tests on every push and pull request to `main` branch.

---

Maintained by [Shazad Alam Khalil](https://github.com/Shazad1406)
