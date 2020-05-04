import * as express from "express";
import * as api_routes from "./admin";
import * as form from "../controllers/form";
import * as reCAPTCHA from "../controllers/reCAPTCHA";

export const register = (app: express.Application) =>
{
  // landing view
  app.get("/", (req: express.Request, res: express.Response) =>
  {
    res.render("index");
  });

  app.post("/submit-form", (req: express.Request, res: express.Response) =>
  {
    // Validate user actions with Google reCAPTCHA
    reCAPTCHA.validate(req.body.reCAPTCHA)
      .then(() =>
      {
        form.submit(req.body)
          .then(() => res.render("index", { alerts: [{ message: "Your message has been submitted.", code: 200 }] }))
          .catch((err) => res.render("index", { errors: [{ message: err, code: 401 }] }));
      })
      .catch((err) => res.render("index", { errors: [{ message: err, code: 401 }] }));
  });

  // Register API routes
  api_routes.register(app);
};
