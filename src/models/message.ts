import * as fs from "fs";

type Message = {
  id: number;
  name: string;
  email: string;
  message: string;
  create_at: string;
};

/** ********************************************************************* *//**
 * Create Message
 *
 * Creates a message text file at the specified path. A boolean response is
 * returned to inform of the opperation status.
 *
 * @param { string } file_path
 * @param { string } file_content
 * @returns { Promise<boolean> }
 */
export const create = (file_path: string, file_content: string) => new Promise<boolean>(
  (resolve, reject) =>
  {
    fs.writeFile(file_path, file_content, (err) =>
    {
      if (err)
      {
        return reject(err);
      }

      return resolve(true);
    });
  },
);

/** ********************************************************************* *//**
 * Get Message
 *
 * Gets the content of the messgae found at the specified file path. If the
 * message file is found, it is opened, encoded and returned as a Message type
 *
 * @param { string } file_path
 * @returns { Promise<Message> }
 */
export const get = (file_path: string) => new Promise<Message>((resolve, reject) =>
{
  fs.readFile(file_path, "utf8", (err, data) =>
  {
    if (err)
    {
      throw Error(`Error reading file ${file_path}`);
    }

    const message: Message = JSON.parse(data);

    resolve(message);
  });
});

/** ********************************************************************* *//**
 * Destroy Message
 *
 * Deletes the message file found at the specific file path. A boolean response
 * is returned to inform of the opperation status.
 *
 * @param { string } file_path
 * @returns { Promise<boolean> }
 */
export const destroy = (file_path: string) => new Promise<boolean>((resolve, reject) =>
{
  fs.exists(file_path, (exists) =>
  {
    if (exists)
    {
      fs.unlink(file_path, (delete_error) =>
      {
        if (delete_error)
        {
          reject(Error("File could not be delted."));
        }

        return resolve(true);
      });
    }
    else
    {
      reject(Error("File doesnt exist."));
    }
  });
});
