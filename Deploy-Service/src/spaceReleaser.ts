import * as fs from "fs";
import * as path from "path";

/**
 * Recursively deletes files and folders in the specified directory.
 * @param folderPath - The folder to delete.
 */
export const localSpaceReleaser = (folderPath: string) => {
  try {
    if (fs.existsSync(folderPath)) {
      const files = fs.readdirSync(folderPath);

      for (const file of files) {
        const currentPath = path.join(folderPath, file);

        if (fs.lstatSync(currentPath).isDirectory()) {
          // Recursively delete subdirectories
          localSpaceReleaser(currentPath);
        } else {
          // Delete files
          fs.unlinkSync(currentPath);
        }
      }

      // Delete the now-empty folder
      fs.rmdirSync(folderPath);
    } else {
      console.error(`Folder not found: ${folderPath}`);
    }
  } catch (error) {
    console.error(`Error while releasing space for folder: ${folderPath}`);
    console.error(error);
  }
};
