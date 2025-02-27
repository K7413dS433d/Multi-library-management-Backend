import * as libraryResponseTypes from "./types/library.response.types.js";
import * as libraryInputTypes from "./types/library.request.types.js";
import * as libraryMutationService from "./service/library.mutation.service.js";
import * as libraryQueryService from "./service/library.query.service.js";
import { messageResponse } from "../../utils/index.utils.js";

export const libraryQuery = {
  getAllLibraries: {
    type: libraryResponseTypes.getAllLibrariesResponse,
    resolve: libraryQueryService.getAllLibraries,
  },

  getLibrary: {
    type: libraryResponseTypes.getLibraryResponse,
    args: {
      ...libraryInputTypes.getLibraryInputType,
    },
    resolve: libraryQueryService.getLibrary,
  },
};

export const libraryMutation = {
  addLibrary: {
    type: libraryResponseTypes.addLibraryResponseType,
    args: {
      ...libraryInputTypes.addLibraryInputType,
    },
    resolve: libraryMutationService.addLibrary,
  },

  deleteLibrary: {
    type: messageResponse,
    args: {
      ...libraryInputTypes.deleteLibraryInputType,
    },

    resolve: libraryMutationService.deleteLibrary,
  },
};
