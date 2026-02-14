# Screenshots Directory Structure

This directory contains project screenshots organized by project slug.

## Directory Structure

```
/public/screenshots/
  ├── cisco/
  │   ├── screenshot1.png
  │   ├── screenshot2.jpg
  │   └── ...
  ├── darwinbox/
  │   ├── dashboard.png
  │   └── ...
  ├── empowered-margins/
  │   └── ...
  ├── exactly-once/
  │   └── ...
  └── faithcircle/
      └── ...
```

## Usage

1. Create a folder named after the project slug (e.g., `cisco`, `darwinbox`, `faithcircle`)
2. Add image files (`.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`, `.svg`) to the folder
3. **Mobile/portrait screenshots:** Put them in a `mobile/` subfolder (e.g. `faithcircle/mobile/`) so they display in portrait (9:16) without cropping
4. The project page will automatically detect and display all images (including from subfolders) in a gallery
5. If a folder is empty or doesn't exist, the "Screenshots" section will be hidden

## Supported Image Formats

- JPEG (.jpg, .jpeg)
- PNG (.png)
- WebP (.webp)
- GIF (.gif)
- SVG (.svg)

Images are automatically optimized using Next.js Image component with lazy loading.
