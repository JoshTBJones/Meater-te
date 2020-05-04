"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_routes = __importStar(require("./admin"));
const form = __importStar(require("../controllers/form"));
const reCAPTCHA = __importStar(require("../controllers/reCAPTCHA"));
exports.register = (app) => {
    // landing view
    app.get("/", (req, res) => {
        res.render("index");
    });
    app.post("/submit-form", (req, res) => {
        // Validate user actions with Google reCAPTCHA
        reCAPTCHA.validate(req.body.reCAPTCHA)
            .then(() => {
            form.submit(req.body)
                .then(() => res.render("index", { alerts: [{ message: "Your message has been submitted.", code: 200 }] }))
                .catch((err) => res.render("index", { errors: [{ message: err, code: 401 }] }));
        })
            .catch((err) => res.render("index", { errors: [{ message: err, code: 401 }] }));
    });
    // Register API routes
    api_routes.register(app);
};
//# sourceMappingURL=index.js.map