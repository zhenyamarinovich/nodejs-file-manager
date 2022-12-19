import path from "path";
import { readdir } from "node:fs/promises";

import { transformedFiles } from "./selectors.js";
import { throwOperationFailed, isPathNotExist } from "../../selectors.js";

export const up = (currentPath) => {
  return path.resolve(currentPath, "..");
};

export const cd = (currentPath, newPath) => {
  if (!newPath || isPathNotExist(path.resolve(currentPath, newPath))) {
    throwOperationFailed();
    return currentPath;
  }

  return path.resolve(currentPath, newPath);
};

export const ls = async (currentPath) => {
  try {
    let contents = await readdir(currentPath, { withFileTypes: true });

    console.table(transformedFiles(contents));
  } catch (err) {
    console.error(err);
  }
};
