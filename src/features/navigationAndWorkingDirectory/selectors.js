const compare = (a, b) => {
  if (a === b) return 0;
  if (a > b) return 1;
  if (a < b) return -1;
};

const sortByType = (arr) => {
  return arr.sort((a, b) => {
    const result = compare(a["Type"], b["Type"]);

    return result;
  });
};

export const transformedFiles = (contents) => {
  contents = contents.map((elem) => {
    return {
      Name: elem.name,
      Type: elem.isFile() ? "file" : "directory",
    };
  });

  return sortByType(contents);
};
