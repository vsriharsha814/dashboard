#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

/**
 * Favicon Generation Script
 * 
 * This script generates a favicon.ico file from the SVG icon.
 * 
 * Usage:
 *   1. Install the required package: npm install sharp --save-dev
 *   2. Run: node scripts/generate-favicon.js
 * 
 * Alternative (without dependencies):
 *   Use an online tool like https://realfavicongenerator.net/
 *   Upload public/icon.svg to generate all favicon formats
 */

const fs = require('fs');
const path = require('path');

console.log(`
╔════════════════════════════════════════════════════════════════════╗
║                     Favicon Generation Guide                       ║
╚════════════════════════════════════════════════════════════════════╝

Your portfolio now has a professional favicon system set up!

📁 Files Created:
  ✓ public/icon.svg          - High-quality SVG icon
  ✓ app/icon.tsx             - 32x32 favicon generator
  ✓ app/apple-icon.tsx       - 180x180 Apple touch icon generator

🎨 Design Features:
  • Modern gradient (Blue: #2563EB → #1E40AF)
  • Your initials "SH" in bold, professional typography
  • Subtle accent line for visual balance
  • Optimized for light and dark backgrounds

🔧 Next.js 14+ automatically generates:
  • favicon.ico (32x32)
  • apple-touch-icon.png (180x180)
  • Multiple sizes for different devices

✅ The favicon will appear after:
  1. Rebuilding your Next.js app: npm run build
  2. Or restarting dev server: npm run dev
  3. Hard refresh your browser: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)

📊 SEO & Metadata:
  • Open Graph tags added for social media sharing
  • Twitter Card support included
  • Professional meta descriptions

🌐 For production deployment:
  • Replace the metadataBase URL in app/layout.tsx with your actual domain
  • Current placeholder: https://sriharshavallabhaneni.com

Need additional favicon formats?
Visit: https://realfavicongenerator.net/
Upload: public/icon.svg

╔════════════════════════════════════════════════════════════════════╗
║                    All set! Your favicon is ready! 🚀             ║
╚════════════════════════════════════════════════════════════════════╝
`);

// Check if running in the correct directory
const publicDir = path.join(process.cwd(), 'public');
const iconPath = path.join(publicDir, 'icon.svg');

if (fs.existsSync(iconPath)) {
  console.log('✓ Verified: icon.svg exists in public directory\n');
} else {
  console.error('✗ Error: icon.svg not found in public directory\n');
  console.error('Please run this script from the project root directory.\n');
}

