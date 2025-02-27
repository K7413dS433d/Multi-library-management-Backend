import { createHandler } from "graphql-http/lib/use/express";
import { connection } from "./database/connection.js";
import { schema } from "./modules/app.graph.js";

const bootstrap = async (app, express) => {
  //connect to db
  await connection();

  //parsing request
  app.use(express.json());

  //routes
  app.all(
    "/graphQl",
    createHandler({
      schema,
      context: (req) => {
        return { token: req.headers.authorization };
      },
      formatError: (error) => {
        return {
          stack: error.stack,
          success: false,
          status: error.originalError?.status || 500,
          message: error.originalError?.message || error.message,
        };
      },
    })
  );

  //not found rout
  app.all("*", (req, res, next) =>
    next(new Error("Not found path", { cause: 404 }))
  );
};

export default bootstrap;
