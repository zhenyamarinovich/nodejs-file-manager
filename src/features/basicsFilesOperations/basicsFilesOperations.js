import fs from "fs";
import { writeFile, rm as remove, rename } from "node:fs/promises";
import path from "path";
import os from "os";

import { throwOperationFailed } from "../../selectors.js";

export const cat = async (currentPath, newPath) => {
  try {
    const stream = fs.createReadStream(path.resolve(currentPath, newPath));

    stream.pipe(process.stdout);
    stream.on("close", () => {
      process.stdout.write(os.EOL);
    });
    stream.on("error", () => {
      throwOperationFailed();
    });
  } catch {
    throwOperationFailed();
  }
};

export const add = async (currentPath, newPath) => {
  try {
    await writeFile(path.resolve(currentPath, newPath), " ", { flag: "wx" });
  } catch {
    throwOperationFailed();
  }
};

export const rm = async (currentPath, newPath) => {
  try {
    await remove(path.resolve(currentPath, newPath));
  } catch {
    throwOperationFailed();
  }
};

export const rn = async (currentPath, oldPath, newPath) => {
  const pathWithoutFile = path.dirname(path.resolve(currentPath, oldPath));

  try {
    await rename(
      path.resolve(currentPath, oldPath),
      path.resolve(pathWithoutFile, newPath)
    );
  } catch {
    throwOperationFailed();
  }
};

export const cp = async (currentPath, oldPath, newPath) => {
  try {
    const readStream = fs.ReadStream(path.resolve(currentPath, oldPath));
    const writableStream = fs.WriteStream(
      path.resolve(currentPath, newPath, path.basename(oldPath))
    );

    readStream.on("error", () => throwOperationFailed());
    writableStream.on("error", () => throwOperationFailed());

    readStream.pipe(writableStream);
  } catch {
    throwOperationFailed();
  }
};

export const mv = async (currentPath, oldPath, newPath) => {
  try {
    await cp(currentPath, oldPath, newPath).then(() => {
      rm(currentPath, oldPath);
    });
  } catch {
    throwOperationFailed();
  }
};
