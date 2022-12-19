import fs from "fs";

import { ARGV_USERNAME_PREFIX } from "./constants.js";

export const getUserName = () => {
  const str = process.argv.slice(2)[0];

  if (str && str.startsWith(ARGV_USERNAME_PREFIX)) {
    return (
      str[ARGV_USERNAME_PREFIX.length].toUpperCase() +
      str.slice(ARGV_USERNAME_PREFIX.length + 1)
    );
  }

  throw new Error("Invalide userName");
};

export const getCurrentDirectory = (path) => {
  console.log(`You are currently in ${path}`);
};

export const getWelcomeMessage = () => {
  return console.log(`Welcome to the File Manager, ${getUserName()}!`);
};

export const getCloseMessage = (readline) => {
  console.log(`Thank you for using File Manager, ${getUserName()}, goodbye!`);
  readline.close();
};

export const parseInput = (input) => {
  return input.split(" ");
};

export const throwInvalidInput = () => {
  try {
    throw new Error("Invalid input!");
  } catch (error) {
    console.log(error.message);
  }
};

export const throwOperationFailed = () => {
  try {
    throw new Error("Operation failed!");
  } catch (error) {
    console.log(error.message);
  }
};

export const isPathNotExist = (fullPath) =>
  !fs.existsSync(fullPath) || !fs.lstatSync(fullPath).isDirectory();
