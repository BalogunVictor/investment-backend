import nodemailer from "nodemailer";
import Mailgen from "mailgen";

import "dotenv/config";

//http://ethereal.email/create

let nodeConfig = {
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: process.env.EMAIL, //generate ethereal user
    pass: process.env.PASSWORD, //generate ethereal password
  },
};

let transporter = nodemailer.createTransport(nodeConfig);

let MailGenerator = new Mailgen({
  theme: "default",
  product: {
    name: "Mailgen",
    link: "https://mailgen.js/",
  },
});

export const registerMail = async (req, res) => {
  const { userEmail, text, subject } = req.body;

  // body of the email
  var email = {
    body: {
      name: userEmail,
      intro:
        text ||
        "Welcome to Investment plan! We're very excited to have you on board.",
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };

  var emailBody = MailGenerator.generate(email);

  let message = {
    from: process.env.EMAIL,
    to: userEmail,
    subject: subject || "Signup Successful",
    html: emailBody,
  };

  // send mail
  transporter
    .sendMail(message)
    .then(() => {
      return res
        .status(200)
        .send({ msg: "You should receive an email from us." });
    })
    .catch((error) => {
      console.error("Error sending email:", error);
      return res
        .status(500)
        .send({ error: "Failed to send email. Please try again later." });
    });
};
