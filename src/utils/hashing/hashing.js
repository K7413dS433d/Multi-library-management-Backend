import byCrypt from "bcryptjs";

export const hash = ({ text, salt }) => {
  return byCrypt.hashSync(text, salt);
};

export const compare = ({ text, hashedText }) => {
  return byCrypt.compareSync(text, hashedText);
};
