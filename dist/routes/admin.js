"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin = __importStar(require("../controllers/admin"));
exports.register = (app) => {
    // admin portal
    app.get("/admin/", (req, res) => {
        admin.index_messages()
            .then((messages) => {
            res.render("admin", { messages });
        })
            .catch((err) => {
            res.render("admin", { errors: [{ message: err }] });
        });
    });
    // Delete Message
    app.post("/admin/delete-message", (req, res) => {
        admin.delete_message(req.body.message_id)
            .then(() => {
            res.redirect("/admin");
        })
            .catch((err) => {
            // Should reload messages here and send with response.
            res.render("admin", { errors: [{ message: err }] });
        });
    });
};
//# sourceMappingURL=admin.js.map