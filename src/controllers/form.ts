import * as fs from "fs";

/** ********************************************************************* *//**
 * Submit
 *
 * @param { any } body
 * @returns Promise
 */
export const submit = (body: any) => new Promise((resolve, reject) =>
{
  // Validate input
  const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  if (!re.test(body.email))
  {
    reject(new Error("Please enter a valid email."));
  }

  // Set file name and content
  const file_name = `${body.email}-${Date.now()}.txt`;
  const file_content: string = JSON.stringify(body);

  // Write file
  fs.writeFile(`public/${file_name}`, file_content, (err) =>
  {
    if (err)
    {
      reject(err);
    }

    resolve(true);
  });
});
