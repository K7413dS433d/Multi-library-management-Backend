import cryptJS from "crypto-js";

export const encrypt = ({ text, secret }) => {
  return cryptJS.AES.encrypt(text, secret).toString();
};

export const decrypt = ({ cypherText, secret }) => {
  return cryptJS.AES.decrypt(cypherText, secret).toString(cryptJS.enc.Utf8);
};
