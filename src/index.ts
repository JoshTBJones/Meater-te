import dotenv from "dotenv";
import express from "express";
import path from "path";
import body_parser from "body-parser";
import * as routes from "./routes";

dotenv.config();

const app = express();
const port_address = process.env.SERVER_PORT;

// Configure Express to use EJS
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// configure the app to use bodyParser()
app.use(body_parser.urlencoded({
  extended: true,
}));
app.use(body_parser.json());

routes.register(app);

// start the Express server
app.listen(port_address, () =>
{
  const a_variable = "test";
  console.log(a_variable);
  console.log(`server started at http://localhost:${port_address}`);
});
