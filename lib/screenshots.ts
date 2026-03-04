import { readdir } from "fs/promises";
import { join } from "path";

const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"];

function isImageFile(path: string): boolean {
  const lower = path.toLowerCase();
  return IMAGE_EXTENSIONS.some((ext) => lower.endsWith(ext));
}

/**
 * Scans /public/screenshots/{projectSlug}/ for image files, including subfolders (e.g. mobile/).
 * Paths containing "/mobile/" are treated as mobile (portrait) screenshots in the gallery.
 * Returns array of image paths relative to /public, or empty array if folder doesn't exist or is empty.
 */
export async function getProjectScreenshots(projectSlug: string): Promise<string[]> {
  try {
    const screenshotsDir = join(process.cwd(), "public", "screenshots", projectSlug);
    const entries = await readdir(screenshotsDir, { recursive: true });
    const images = (Array.isArray(entries) ? entries : [])
      .filter(
        (entry): entry is string =>
          typeof entry === "string" &&
          isImageFile(entry) &&
          !entry.toLowerCase().endsWith("placeholder.svg")
      )
      .map((relPath) => `/screenshots/${projectSlug}/${relPath}`.replace(/\/+/g, "/"))
      .sort();
    return images;
  } catch {
    return [];
  }
}

/** Returns true if the screenshot path is under a "mobile" subfolder (portrait formatting). */
export function isMobileScreenshot(path: string): boolean {
  return path.includes("/mobile/");
}
