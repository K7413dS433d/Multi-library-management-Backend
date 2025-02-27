import * as middlewares from "../../../middleware/index.middlewares.js";
import * as models from "../../../database/models/index.models.js";
import { AppError, setResponse } from "../../../utils/index.utils.js";
import { roles } from "../../../common/index.common.js";

export async function addLibrary(_, args, context) {
  //auth
  await middlewares.isAuthenticated(context);
  middlewares.isAuthorized(context, roles.ADMIN);

  const { libName } = args;

  const libExist = await models.Library.findOne({ name: libName });
  if (libExist) throw new AppError("Library already exist", 409);

  const newLib = new models.Library(args);
  await newLib.save();

  return setResponse({
    status: 200,
    message: "Library Created Successfully",
    data: {
      libraryId: newLib.id,
    },
  });
}

export async function deleteLibrary(_, args, context) {
  //auth
  await middlewares.isAuthenticated(context);
  middlewares.isAuthorized(context, roles.ADMIN);

  const { name } = args;
  console.log(name);

  const libExist = await models.Library.findOneAndDelete({ name });
  if (!libExist) throw new AppError("Library not exist", 409);

  return setResponse({
    status: 200,
    message: `library ${libExist.name} is deleted successfully`,
  });
}
