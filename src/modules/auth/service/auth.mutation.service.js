import * as middlewares from "../../../middleware/index.middlewares.js";
import * as models from "../../../database/models/index.models.js";
import { roles } from "../../../common/index.common.js";
import {
  AppError,
  compare,
  generateToken,
  setResponse,
} from "../../../utils/index.utils.js";

export async function register(_, args) {
  const { name, email, password, phone } = args.input;

  const newUser = new models.User({ name, email, password, phone });
  await newUser.save();

  return setResponse({
    data: { id: newUser.id, email: newUser.email },
    message: "successfully",
    success: true,
    status: 201,
  });
}

export async function login(_, args) {
  const { email, password } = args;

  const userExist = await models.User.findOne({ email });
  if (!userExist) throw new AppError("invalid credentials", 401);

  if (!compare({ text: password, hashedText: userExist.password }))
    throw new AppError("invalid credentials", 401);

  const token = generateToken({
    payload: { id: userExist.id },
    secret: process.env.JWT_SECRETE,
  });

  return setResponse({
    data: { token },
    message: "login successfully",
    success: true,
    status: 200,
  });
}

export const deleteUser = async (_, args, context) => {
  //auth
  await middlewares.isAuthenticated(context);
  middlewares.isAuthorized(context, roles.USER);

  await models.User.deleteOne({ _id: context.user.id });
  return setResponse({
    message: "User deleted successfully",
    success: true,
    status: 200,
  });
};
