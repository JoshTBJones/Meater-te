import * as express from "express";
import * as admin from "../controllers/admin";

export const register = (app: express.Application) =>
{
  // admin portal
  app.get("/admin/", (req: express.Request, res: express.Response) =>
  {
    admin.index_messages()
      .then((messages) =>
      {
        res.render("admin", { messages });
      })
      .catch((err) =>
      {
        res.render("admin", { errors: [{ message: err }] });
      });
  });

  // Delete Message
  app.post("/admin/delete-message", (req: express.Request, res: express.Response) =>
  {
    admin.delete_message(req.body.message_id)
      .then(() =>
      {
        res.redirect("/admin");
      })
      .catch((err) =>
      {
        // Should reload messages here and send with response.
        res.render("admin", { errors: [{ message: err }] });
      });
  });
};
