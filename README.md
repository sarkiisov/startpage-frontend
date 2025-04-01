# Startpage frontend

A customizable Chrome startpage extension with automatic links favicon fetching and additional usability and personalization features.

![startpage-preview](./docs/preview.png)

## Features

- **🔗 Link Previews** – Displays favicons (requires [startpage-backend](https://github.com/sarkiisov/startpage-backend)).

- **📌 Drag & Drop Links** – Easily organize your links.

- **🖼️ Custom Background** – Personalize with your own image.

- **📐 Adjustable Grid Layout** – Modify link column count.

- **🎨 Auto Contrast Labels** – Ensures readability on any background.

## Installation & usage

1. Install pnpm (package manager)

   https://pnpm.io/installation

2. Build static assets for Chrome Extension

   ```sh
   pnpm install
   pnpm build
   ```

3. Load the Extension in Chrome

   1. Open **Chrome** and navigate to `chrome://extensions/`
   2. Enable **Developer mode** (top-right corner)
   3. Click **Load unpacked** and select the `dist` folder

4. (Optional) Run [startpage-backend](https://github.com/sarkiisov/startpage-backend)

   1. For favicon previews, start the backend service.
   2. Put backend service URL in startpage settings.

## Stack

Vite, React, TypeScript, Tailwind v4, Dnd-kit, React hook form, Zod
