import * as middlewares from "../../../middleware/index.middlewares.js";
import { roles } from "../../../common/index.common.js";
import { Library } from "../../../database/models/index.models.js";
import { AppError, setResponse } from "../../../utils/index.utils.js";

export async function getAllLibraries(_, args, context) {
  //auth
  await middlewares.isAuthenticated(context);
  middlewares.isAuthorized(context, roles.ADMIN);

  const allLibs = await Library.find();
  return setResponse({
    message: "successful",
    success: true,
    status: 200,
    data: allLibs,
  });
}

export async function getLibrary(_, args, context) {
  //auth
  await middlewares.isAuthenticated(context);
  middlewares.isAuthorized(context, roles.ADMIN, roles.USER);

  const { libraryName } = args;

  const libExist = await Library.findOne({ name: libraryName }).populate({
    path: "books",
    populate: {
      path: "author",
      select: "name email",
    },
  });

  if (!libExist) throw new AppError("library not exist", 404);

  return setResponse({ status: 200, message: "successfully", data: libExist });
}
