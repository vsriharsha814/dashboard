import { readdir } from "fs/promises";
import { join } from "path";

/**
 * Scans /public/screenshots/{projectSlug}/ for image files.
 * Returns array of image paths relative to /public, or empty array if folder doesn't exist or is empty.
 */
export async function getProjectScreenshots(projectSlug: string): Promise<string[]> {
  try {
    const screenshotsDir = join(process.cwd(), "public", "screenshots", projectSlug);
    const files = await readdir(screenshotsDir);
    const imageExtensions = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"];
    const images = files
      .filter((file) => imageExtensions.some((ext) => file.toLowerCase().endsWith(ext)))
      .map((file) => `/screenshots/${projectSlug}/${file}`)
      .sort();
    return images;
  } catch {
    // Folder doesn't exist or can't be read
    return [];
  }
}
