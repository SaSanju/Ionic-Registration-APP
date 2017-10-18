var nodemailer = require("nodemailer");

// SMTP SET UP
var smtpTransport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "youremail",
    pass: "password"
  }
});
var rand, mailOptions, host, link;
// end


function veryficationMailSender(req, num) {
  rand = num;
  host = req.get('host');
  link = "http://" + req.get('host') + "/verify?id=" + rand;
  mailOptions = {
    to: req.body.email,
    subject: "Please confirm your Email account",
    html: "Hello,<br> Please Click on the link to verify your email.<br><a href=" + link + ">Click here to verify</a>"
  }
  console.log(mailOptions);
  smtpTransport.sendMail(mailOptions, function (error, response) {
    if (error) {
      console.log(error);
      response.end("error");
    } else {
      console.log(response)
      console.log("Message sent to: " + response.messageId);
      response.end("sent");
    }
  });
}

module.exports.veryficationMailSender = veryficationMailSender;
