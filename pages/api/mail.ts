import type { NextApiRequest, NextApiResponse } from "next";
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY);

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const { user, error } = JSON.parse(req.body);
    console.log(user, error);
    try {
      await sgMail.send({
        to: "juan.riquelme@aiesec.net",
        from: "intercambios@aiesec.org.pa",
        subject: `[ERROR] OGX Form Error - SU: ${user["First Name"]} ${user["Last Name"]}`,
        text: "-------",
        html: `The next error ocurred: ${error}. This happend with the next user:
        - ${user["First Name"]} ${user["Last Name"]}
        - ${user["Email"]}
        - ${user["Program"]}
        - ${user["Universidad"]}
        `,
      });
      res.status(200).json({ message: "Your message was sent successfully." });
    } catch (err) {
      res.status(500).json({
        message: `There was an error sending your message. ${err}`,
      });
    }
  }
}
