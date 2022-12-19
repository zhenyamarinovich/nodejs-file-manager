import * as rl from "node:readline/promises";
import os from "os";

import * as nwd from "./features/navigationAndWorkingDirectory/nwd.js";
import * as basicsFilesOperations from "./features/basicsFilesOperations/basicsFilesOperations.js";
import * as operationSystem from "./features/operationSystem/os.js";
import * as hash from "./features/hash/hash.js";
import * as zip from "./features/compressAndDecompress/zip.js";

import { EXIT_COMMAND } from "./constants.js";

import {
  getCloseMessage,
  getCurrentDirectory,
  getWelcomeMessage,
  parseInput,
  throwInvalidInput,
} from "./selectors.js";

const readline = rl.createInterface(process.stdin, process.stdout);

let currentPath = os.homedir();

const createMainStream = async () => {
  try {
    getWelcomeMessage();
    getCurrentDirectory(currentPath);
  } catch (err) {
    readline.write(`${err} try start again!`);
    readline.close();
  }

  readline.on("line", async (input) => {
    const [command, newPath, additionalParameter] = parseInput(input);

    switch (command) {
      case EXIT_COMMAND:
        getCloseMessage(readline);
        break;
      case "up":
        currentPath = nwd.up(currentPath);
        break;
      case "cd":
        currentPath = nwd.cd(currentPath, newPath);
        break;
      case "ls":
        await nwd.ls(currentPath);
        break;
      case "cat":
        basicsFilesOperations.cat(currentPath, newPath);
        break;
      case "add":
        basicsFilesOperations.add(currentPath, newPath);
        break;
      case "rm":
        basicsFilesOperations.rm(currentPath, newPath);
        break;
      case "rn":
        basicsFilesOperations.rn(currentPath, newPath, additionalParameter);
        break;
      case "cp":
        basicsFilesOperations.cp(currentPath, newPath, additionalParameter);
        break;
      case "mv":
        basicsFilesOperations.mv(currentPath, newPath, additionalParameter);
        break;
      case "os":
        switch (newPath) {
          case "--EOL":
            operationSystem.EOL();
            break;
          case "--cpus":
            operationSystem.cpus();
            break;
          case "--homedir":
            operationSystem.homedir();
            break;
          case "--username":
            operationSystem.username();
            break;
          case "--architecture":
            operationSystem.architecture();
            break;
          default:
            throwInvalidInput();
            break;
        }
        break;
      case "hash":
        await hash.hash(currentPath, newPath);
        break;
      case "compress":
        zip.compress(currentPath, newPath, additionalParameter);
        break;
      case "decompress":
        zip.decompress(currentPath, newPath, additionalParameter);
        break;

      default:
        throwInvalidInput();
        break;
    }
    getCurrentDirectory(currentPath);
  });

  readline.on("error", () => {
    throwInvalidInput();
  });

  readline.on("SIGINT", () => {
    getCloseMessage(readline);
  });
};

createMainStream();
