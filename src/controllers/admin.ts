import * as fs from "fs";
import * as message from "../models/message";

/** ********************************************************************* *//**
 * Index Messages
 *
 * This function retrieves all messages stored on the server. Each message file
 * is opened and parsed as JSON before being returned as an array.
 *
 * @returns { Promise<Array> }
 */
export const index_messages = () => new Promise<Array<any>>((resolve, reject) =>
{
  fs.readdir("public/", (err, files) =>
  {
    if (err)
    {
      reject(Error("File could not be read."));
    }

    // Reverse files array to make most recent first
    files.reverse();

    // Decoded files
    const decoded_files: Array<any> = [];

    // If no files return
    if (files.length === 0)
    {
      resolve();
    }

    // Loop found files and get file contents via Message model
    files.forEach((file) =>
    {
      message.get(`public/${file}`)
        .then((data) =>
        {
          decoded_files.push(data);
          // If the length of both arrays are equal the GET process is finished
          if (decoded_files.length === files.length)
          {
            // Sort decoded data by id, and reverse list (newest first)
            resolve(decoded_files.sort((a, b) => a.id - b.id).reverse());
          }
        })
        .catch((message_error) => reject(message_error));
    });
  });
});

/** ********************************************************************* *//**
 * Delete Message
 *
 * Delete the message file for the passed messaged_id. With the supplied id we
 * form the file name. Then we pass that to the Message destroy method found on
 * the message model.
 *
 * @param { string } message_id
 * @returns { Promise }
 */
export const delete_message = (message_id: string) => new Promise((resolve, reject) =>
{
  const file_path = `public/${message_id}.txt`;
  message.destroy(file_path)
    .then(() =>
    {
      resolve();
    })
    .catch((err) =>
    {
      const error_message: string = err.message;
      reject(Error(error_message));
    });
});
