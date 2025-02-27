import express from "express";
import bootstrap from "./src/app.controller.js";

const app = express();
const port = +process.env.PORT || 3000;

//calling bootstrap
await bootstrap(app, express);

app.listen(port, (err) => {
  if (err) return console.log(err.message);
  console.log("app is running on port", port);
});
