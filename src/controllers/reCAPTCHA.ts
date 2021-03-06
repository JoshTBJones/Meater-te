import request from "request";

/** ********************************************************************* *//**
 * Validate
 *
 * Validates the token generated by user input via Googles reCAPTCHA api. The
 * response is then parsed and checked for the success attribute, if this is
 * true the user has been deemed trustworthy and the message posting process
 * can contiue.
 *
 * @param { string } token
 * @returns { Promise<boolean> }
 */
export const validate = (token: string) => new Promise<boolean>((resolve, reject) =>
{
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}=&response=${token}`;
  request(url, (err: any, response: any, body: any) =>
  {
    if (err)
    {
      const error_message: string = err.message;
      reject(Error(error_message));
    }

    // parse response body as JSON
    const res_body = JSON.parse(body);

    // If the Google response success is false, assume spam
    if (!res_body.success)
    {
      reject(Error("Spam detected. Terry hates spam!"));
    }

    return resolve(true);
  });
});
