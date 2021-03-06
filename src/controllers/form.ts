import * as fs from "fs";
import * as message from "../models/message";

/** ********************************************************************* *//**
 * Submit
 *
 * Submit user message to server. First we validate the email using the awful
 * but effective regex. Once this has passed we need to validate the user name
 * has been supplied. If all user data is valid we then move on to create a new
 * message file.
 *
 * @param { any } body
 * @returns Promise
 */
export const submit = (body: any) => new Promise((resolve, reject) =>
{
  // Validate email
  const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  if (!re.test(body.email))
  {
    reject(Error("Please enter a valid email. Terry needs to know who to contact."));
  }

  // Validate name
  if (body.name.length === 0)
  {
    reject(Error("Please enter your name. Terry likes to know who he's talking to."));
  }

  // Get current number of saved files and increment by one to create unique
  // file name.
  const file_index: number = fs.readdirSync("public/").length + 1;

  // Create text file data structure
  const file_data: object = {
    id: file_index,
    email: body.email,
    name: body.name,
    message: body.message,
    subscribed: !!body.subscribe,
    created_at: Date.now(),
  };

  // Set file name and content
  const file_name = `${file_index}.txt`;
  const file_content: string = JSON.stringify(file_data);

  // Create File
  message.create(`public/${file_name}`, file_content)
    .then(() => resolve(true))
    .catch((err) => reject(err));
});
