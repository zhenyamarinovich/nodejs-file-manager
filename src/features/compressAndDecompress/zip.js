import fs from "fs";
import path from "path";
import zlib from "zlib";

import { throwOperationFailed } from "../../selectors.js";

export const compress = (currentPath, oldPath, newPath) => {
  try {
    const inp = fs.createReadStream(path.resolve(currentPath, oldPath));

    const out = fs.createWriteStream(
      `${path.resolve(currentPath, newPath, path.basename(oldPath))}.gz`
    );

    const brot = zlib.createBrotliCompress();

    inp.pipe(brot).pipe(out);
  } catch {
    throwOperationFailed();
  }
};

export const decompress = (currentPath, oldPath, newPath) => {
  try {
    const inp = fs.createReadStream(path.resolve(currentPath, oldPath));

    const out = fs.createWriteStream(
      `${path.resolve(
        currentPath,
        newPath,
        path.basename(oldPath, path.extname(oldPath))
      )}`
    );

    const brot = zlib.createBrotliDecompress();

    inp.pipe(brot).pipe(out);
  } catch {
    throwOperationFailed();
  }
};
