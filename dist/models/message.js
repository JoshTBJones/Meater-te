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
 * Create Message
 *
 * Creates a message text file at the specified path. A boolean response is
 * returned to inform of the opperation status.
 *
 * @param { string } file_path
 * @param { string } file_content
 * @returns { Promise<boolean> }
 */
exports.create = (file_path, file_content) => new Promise((resolve, reject) => {
    fs.writeFile(file_path, file_content, (err) => {
        if (err) {
            return reject(err);
        }
        return resolve(true);
    });
});
/** ********************************************************************* */ /**
 * Get Message
 *
 * Gets the content of the messgae found at the specified file path. If the
 * message file is found, it is opened, encoded and returned as a Message type
 *
 * @param { string } file_path
 * @returns { Promise<Message> }
 */
exports.get = (file_path) => new Promise((resolve, reject) => {
    fs.readFile(file_path, "utf8", (err, data) => {
        if (err) {
            throw Error(`Error reading file ${file_path}`);
        }
        const message = JSON.parse(data);
        resolve(message);
    });
});
/** ********************************************************************* */ /**
 * Destroy Message
 *
 * Deletes the message file found at the specific file path. A boolean response
 * is returned to inform of the opperation status.
 *
 * @param { string } file_path
 * @returns { Promise<boolean> }
 */
exports.destroy = (file_path) => new Promise((resolve, reject) => {
    fs.exists(file_path, (exists) => {
        if (exists) {
            fs.unlink(file_path, (delete_error) => {
                if (delete_error) {
                    reject(Error("File could not be delted."));
                }
                return resolve(true);
            });
        }
        else {
            reject(Error("File doesnt exist."));
        }
    });
});
//# sourceMappingURL=message.js.map