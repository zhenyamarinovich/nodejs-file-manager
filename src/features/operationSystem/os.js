import os from "os";

export const EOL = () => {
  console.log(JSON.stringify(os.EOL));
};

export const cpus = () => {
  console.log("amount of CPUS ", os.cpus().length);

  const coefficient = os.arch() === "arm64" ? 10 : 1000;

  const result = os.cpus().reduce((acc, { model, speed }) => {
    return (
      acc +
      `Model -> "${model}"; Clock rate -> ${speed / coefficient} GHz ${os.EOL}`
    );
  }, "");

  console.log(result);
};

export const homedir = () => {
  console.log(os.homedir());
};

export const username = () => {
  console.log(os.userInfo().username);
};

export const architecture = () => {
  console.log(os.arch());
};
