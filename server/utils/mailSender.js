const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {

    try {
       var transpoter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        });
    } catch (e) {
        console.log("Error in mail sender...");
        console.log(e);
    }


    let info = await transpoter.sendMail({
        from: "StudyNotion - by Rebel",
        to: `${email}`,
        subject: `${title}`,
        html: `Your OTP is : ${body}`,
    });
    

    console.log(info);
    return info;

}

module.exports = mailSender;