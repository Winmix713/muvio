# Migrating a Vite React Application to Next.js

This guide helps you transition your existing Vite React application to Next.js, starting with a basic client-side setup to minimize initial changes.

## Why Consider Switching?

Migrating to Next.js offers potential benefits over a client-side only Vite setup, including:

*   **Improved Initial Loading:** Addresses slow loading of large client bundles in SPAs.
*   **Automatic Code Splitting:** Built into the Next.js router (though not immediately used in this SPA migration step).
*   **Reduced Network Waterfalls:** Enables server-side data fetching options (future benefit).
*   **Intentional Loading States:** Support for React Suspense for better UI streaming (future benefit).
*   **Flexible Data Fetching:** Options for static generation (SSG), server-side rendering (SSR), or client-side fetching per page/component (future benefit).
*   **Middleware:** Run server-side code before requests complete (future benefit).
*   **Built-in Optimizations:** Automatic optimization for images, fonts, and scripts.

## Migration Steps

The goal is to get a working Next.js SPA quickly.

### Step 1: Install Next.js

Add next as a project dependency.
```
bash
npm install next@latest
```
### Step 2: Create Next.js Configuration

Create a `next.config.mjs` file at your project root with the following content to configure the build for SPA export:
```
javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Outputs a Single-Page Application (SPA).
  distDir: './dist', // Changes the build output directory to `./dist/`.
}

export default nextConfig
```
### Step 3: Update TypeScript Configuration (If Using TypeScript)

Modify your `tsconfig.json` file:

*   Remove project references to `tsconfig.node.json`.
*   Add `"./dist/types/**/*.ts"` and `"./next-env.d.ts"` to the `include` array.
*   Add `"./node_modules"` to the `exclude` array.
*   Add `{ "name": "next" }` to the `plugins` array in `compilerOptions`.
*   Set `"esModuleInterop": true`.
*   Set `"jsx": "preserve"`.
*   Set `"allowJs": true`.
*   Set `"forceConsistentCasingInFileNames": true`.
*   Set `"incremental": true`.

Your `tsconfig.json` should look similar to the example in the source text.

### Step 4: Create the Root Layout

This replaces your `index.html`. Create an `app` directory inside your `src` directory, and then create `layout.tsx` inside `src/app`.

*   Copy the `<html>`, `<head>`, and `<body>` structure from your `index.html`.
*   Replace the div where your app mounts (`<div id="root">`) and any script tags with `{children}`.
*   Remove redundant `<meta charset>` and `<meta viewport>` tags (Next.js adds these by default).
*   Move favicon, icon, and robots.txt files to the top level of the `app` directory and remove their corresponding `<link>` tags in `layout.tsx`.
*   Move remaining `<title>` and `<meta name="description">` (and similar) into an exported `metadata` object using the Metadata API.

Final `src/app/layout.tsx` structure:
```
javascript
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Your App Title', // From index.html <title>
  description: 'Your App Description', // From index.html <meta description>
  // Add other metadata as needed
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en"> {/* Match your index.html lang */}
      <body>
        <div id="root">{children}</div> {/* Your app mount point */}
      </body>
    </html>
  );
}
```
### Step 5: Create the Entrypoint Page

This replaces your `main.tsx`.

*   Create an `[[...slug]]` directory inside your `src/app` directory (`src/app/[[...slug]]`). This is an optional catch-all route segment to handle all paths in this initial SPA setup.
*   Create `page.tsx` inside `src/app/[[...slug]]`.
*   Create a client component file, e.g., `src/app/[[...slug]]/client.tsx`.

`src/app/[[...slug]]/client.tsx`:
```
javascript
'use client'; // This directive makes it a Client Component

import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import your main App component and disable Server-Side Rendering for it
const App = dynamic(() => import('../../App'), { ssr: false });

export function ClientOnly() {
  return <App />;
}
```
`src/app/[[...slug]]/page.tsx`:
```
javascript
import '../../index.css'; // Import your global CSS

import { ClientOnly } from './client';

// Generate a static index route (/) for the SPA export
export function generateStaticParams() {
  return [{ slug: [''] }];
}

export default function Page() {
  return <ClientOnly />; // Render the client-only part
}
```
### Step 6: Update Static Image Imports

Next.js image imports return an object, not just the URL string like Vite.

*   If you imported images from `/public` using absolute paths (e.g., `import logo from '/logo.png'`), change these to relative paths (e.g., `import logo from '../public/logo.png'`).
*   When using these imported images in standard `<img>` tags, access the `src` property: `<img src={logo.src} />`.

(Note: You can eventually migrate to the `next/image` component for automatic optimization, but this requires specifying width/height or layout props).

### Step 7: Migrate Environment Variables

*   Change any environment variables prefixed with `VITE_` to `NEXT_PUBLIC_`.
*   Update usages of Vite's special `import.meta.env` variables:
    *   `import.meta.env.MODE` becomes `process.env.NODE_ENV`
    *   `import.meta.env.PROD` becomes `process.env.NODE_ENV === 'production'`
    *   `import.meta.env.DEV` becomes `process.env.NODE_ENV !== 'production'`
    *   `import.meta.env.SSR` becomes `typeof window !== 'undefined'`
*   If you used `import.meta.env.BASE_URL`, configure `basePath` in `next.config.mjs` and use `process.env.NEXT_PUBLIC_BASE_PATH` (after adding `NEXT_PUBLIC_BASE_PATH` to your `.env`).

### Step 8: Update Scripts and Gitignore

Modify your `package.json` scripts:
```
json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start -p 3000" // Or your preferred port
  }
}
```
Add Next.js specific build outputs to your `.gitignore`:
```
gitignore
# Next.js build outputs
.next
next-env.d.ts
dist # If you used distDir in next.config.mjs
```
Now, run `npm run dev` to test your application. It should run on `http://localhost:3000`.

(Refer to the example PR linked in the source text if you encounter issues).

### Step 9: Clean Up

Remove Vite-specific files and dependencies:

*   Delete `src/main.tsx`
*   Delete the original `index.html` (outside the `app` directory)
*   Delete `vite-env.d.ts`
*   Delete `tsconfig.node.json`
*   Delete `vite.config.ts`
*   Uninstall Vite dependencies (e.g., `vite`, `@vitejs/plugin-react`, etc.) from `package.json` and run `npm install`.

## Next Steps

You now have a functional Next.js SPA. To leverage Next.js' full capabilities, consider these future steps:

*   Migrate from your current router (e.g., React Router) to the Next.js App Router for automatic code splitting, server rendering, etc.
*   Adopt the `next/image` component for optimized images.
*   Adopt `next/font` for optimized fonts.
*   Adopt `next/script` for optimizing third-party scripts.
*   Update your ESLint configuration with Next.js rules.
*   Explore Server Components, Server-Side Rendering (SSR), and Static Site Generation (SSG) for performance improvements.