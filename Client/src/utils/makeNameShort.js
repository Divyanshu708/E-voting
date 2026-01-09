function makeNameShort(str) {
  const result = str.split(" ");
  return (
    `${result.at(0).at(0)}` + `${result[1] !== undefined ? result[1][0] : ""}`
  ).toUpperCase();
}

export default makeNameShort;
