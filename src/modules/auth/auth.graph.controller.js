import * as authService from "./service/auth.mutation.service.js";
import * as requestTypes from "./types/auth.request.types.js";
import * as responseTypes from "./types/auth.response.types.js";
import { messageResponse } from "../../utils/index.utils.js";

export const authMutation = {
  register: {
    type: responseTypes.registerUserResponseType,
    args: {
      ...requestTypes.registerUserInputType,
    },
    resolve: authService.register,
  },

  login: {
    type: responseTypes.loginUserResponseType,
    args: {
      ...requestTypes.loginUserInputType,
    },
    resolve: authService.login,
  },

  deleteAccount: {
    type: messageResponse,
    resolve: authService.deleteUser,
  },
};
