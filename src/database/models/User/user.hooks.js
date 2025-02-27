import { encrypt, hash } from "../../../utils/index.utils.js";

// hash the password and encrypt phone
export function preHashingData(next, doc) {
  if (this.isModified("phone") || this.isModified("password")) {
    this.phone = encrypt({ text: this.phone, secret: process.env.SECRET_KEY });
    this.password = hash({
      text: this.password,
      salt: +process.env.SALT_ROUND,
    });
  }

  return next();
}
