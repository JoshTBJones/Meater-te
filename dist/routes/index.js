"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const form = __importStar(require("../controllers/form"));
exports.register = (app) => {
    // landing view
    app.get("/", (req, res) => {
        res.render("index", { errors: [{ error: "Fuck you." }] });
    });
    app.post("/submit-form", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        form.submit(req.body)
            .then(() => {
            res.render("index");
        })
            .catch((err) => {
            console.log("error: ", err);
        });
    }));
};
//# sourceMappingURL=index.js.map