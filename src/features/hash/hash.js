import { createHash } from "crypto";
import { readFile } from "fs/promises";
import path from "path";

import { throwOperationFailed } from "../../selectors.js";

export const hash = async (currentPath, newPath) => {
  try {
    const content = await readFile(path.resolve(currentPath, newPath));

    const hashData = createHash("sha256").update(content).digest("hex");

    console.log(hashData);
  } catch {
    throwOperationFailed();
  }
};
