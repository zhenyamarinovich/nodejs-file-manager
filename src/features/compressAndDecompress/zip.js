import fs from "fs";
import path from "path";
import zlib from "zlib";

import { throwOperationFailed } from "../../selectors.js";

export const compress = (currentPath, oldPath, newPath) => {
  try {
    const readStream = fs.createReadStream(path.resolve(currentPath, oldPath));

    const writableStream = fs.createWriteStream(
      `${path.resolve(currentPath, newPath, path.basename(oldPath))}.gz`
    );

    const brotli = zlib.createBrotliCompress();

    readStream.pipe(brotli).pipe(writableStream);
  } catch {
    throwOperationFailed();
  }
};

export const decompress = (currentPath, oldPath, newPath) => {
  try {
    const readStream = fs.createReadStream(path.resolve(currentPath, oldPath));

    const writableStream = fs.createWriteStream(
      `${path.resolve(
        currentPath,
        newPath,
        path.basename(oldPath, path.extname(oldPath))
      )}`
    );

    const brotli = zlib.createBrotliDecompress();

    readStream.pipe(brotli).pipe(writableStream);
  } catch {
    throwOperationFailed();
  }
};
