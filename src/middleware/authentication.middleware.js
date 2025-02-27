import { User } from "../database/models/index.models.js";
import { AppError, verifyToken } from "../utils/index.utils.js";

export const isAuthenticated = async (context) => {
  //get bearer token
  const { token: bearerToken } = context;
  //check token
  if (!bearerToken) throw new AppError("Token is required", 400);

  //check bearer token
  const [bearer, token] = bearerToken.split(" ");
  if (bearer != process.env.BEARER)
    throw new AppError("Invalid bearer token", 400);

  //check valid token
  const { id } = verifyToken({ token, secret: process.env.JWT_SECRETE });

  const userExist = await User.findById(id).select("-password -phone");
  if (!userExist) throw new AppError("User is not login please login first", 400);

  context.user = userExist;
  return true;
};
