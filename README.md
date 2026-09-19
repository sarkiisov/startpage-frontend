# Startpage frontend

![Frontend CI Pipeline](https://github.com/sarkiisov/startpage-frontend/actions/workflows/ci.yml/badge.svg?branch=main)

A customizable Chrome and Firefox startpage extension with automatic links favicon fetching and additional usability and personalization features.

![startpage-preview](./docs/preview.png)

## Features

- **🔗 Link Previews** – Displays favicons, fetched directly from the target site, the App Store, and Google Play.

- **📌 Drag & Drop Links** – Easily organize your links.

- **🖼️ Custom Background** – Personalize with your own image.

- **📐 Adjustable Grid Layout** – Modify link column count.

- **🎨 Auto Contrast Labels** – Ensures readability on any background.

- **🌗 Light & Dark Mode Switching** – Seamlessly toggle between light and dark themes

## Installation & usage

1. Install pnpm (package manager)

   https://pnpm.io/installation

2. Build static assets for Chrome Extension

   ```sh
   pnpm install
   pnpm build
   ```

### For Chrome

3. Load the Extension in Chrome

   1. Open **Chrome** and navigate to `chrome://extensions/`
   2. Enable **Developer mode** (top-right corner)
   3. Click **Load unpacked** and select the `dist` folder

### For Firefox

3. Load the Extension in Chrome

   1. Open **Firefox** and navigate to `about:debugging`
   2. Click **This Firefox**
   3. Click **Load Temporary Add-on**
   4. Select any file from the `dist` folder

### Permissions

The extension requests access to all sites (`host_permissions: ["<all_urls>"]`) so it can fetch favicons directly from the target site, the App Store, and Google Play, without a backend server.

## Stack

Vite, React, TypeScript, Tailwind v4, Dnd-kit, React hook form, Zod
