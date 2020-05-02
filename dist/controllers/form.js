"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
/** ********************************************************************* */ /**
 * Submit
 *
 * @param { any } body
 * @returns Promise
 */
exports.submit = (body) => new Promise((resolve, reject) => {
    // Validate input
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!re.test(body.email)) {
        reject(new Error("Please enter a valid email."));
    }
    // Set file name and content
    const file_name = `${body.email}-${Date.now()}.txt`;
    const file_content = JSON.stringify(body);
    // Write file
    fs.writeFile(`public/${file_name}`, file_content, (err) => {
        if (err) {
            reject(err);
        }
        resolve(true);
    });
});
//# sourceMappingURL=form.js.map