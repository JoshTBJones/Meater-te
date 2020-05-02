import * as express from "express";
import * as form from "../controllers/form";

export const register = (app: express.Application) =>
{
  // landing view
  app.get("/", (req: any, res) =>
  {
    res.render("index", { errors: [{ error: "Fuck you." }] });
  });

  app.post("/submit-form", async (req: any, res) =>
  {
    form.submit(req.body)
      .then(() =>
      {
        res.render("index");
      })
      .catch((err) =>
      {
        console.log("error: ", err);
      });
  });
};
