import { AppError } from "../utils/index.utils.js";

export const isAuthorized = (context, ...allowedRoles) => {
  const { user } = context;
  if (!allowedRoles.includes(user.role))
    throw new AppError("not Authorized Access", 401);
  return true;
};
