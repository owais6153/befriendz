import { config } from "dotenv";
import { STATUS_CODE } from "../../utils/status.code.js";
import nodemailer from "nodemailer";
config();

const host = process.env.MAIL_HOST;
const port = process.env.MAIL_PORT;
const user = process.env.MAIL_USERNAME;
const pass = process.env.MAIL_PASSWORD;

const sendMail = async (subject, message, email, isAccountCreated= false) => {
  try {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: host,
      port: port,
      // secure: false, // true for 465, false for other ports
      auth: {
        user: user, // generated ethereal user
        pass: pass, // generated ethereal password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: user, // sender address
      to: email, // list of receivers
      subject: `${subject} | Be Friendz 👻`, // Subject line
      text: message, // plain text body
      html: message, // html body
    });

    console.log("Message sent: %s", info.messageId);
    return { statusCode: 200 };
  } catch (e) {
    e.message = `${isAccountCreated ? 'Account created! ': ''}Failed to send email`;
    e.statusCode = STATUS_CODE.bad_request;
    throw new Error(e);
  }
};

const SendMail = {
  sendMail,
};

export default SendMail;
