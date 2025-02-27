import jwt from "jsonwebtoken";

export const generateToken = ({ payload, secret, expiresIn = "7d" }) =>
  jwt.sign(payload, secret, { expiresIn });

export const verifyToken = ({ token, secret }) => jwt.verify(token, secret);
