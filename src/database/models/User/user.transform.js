import { decrypt } from "../../../utils/index.utils.js";

export const transFormPhoneQuery = (v) => {
  return decrypt({
    cypherText: v,
    secret: process.env.SECRET_KEY,
  });
};

export const transformPhonePopulated = (v) => {
  v.phone = decrypt({
    cypherText: v.phone,
    secret: process.env.SECRET_KEY,
  });
  return v;
};
