const nodemailer = require("nodemailer");

const mailSender = async ({ email, title, data, msg, name }) => {
    console.log("In the transporter");

    try {
        var transporter = nodemailer.createTransport({
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

    console.log("Running the transporter ->", email, data, title, msg, name);

    let info = await transporter.sendMail({
        from: "Saarthi - Along With You !!",
        to: `${email}`,
        subject: `${title}`,
        html: `
       <div style="background-color: #f9f9f9; padding: 2rem; border-radius: 0.5rem; font-size: 1.125rem; font-family: Arial, sans-serif; line-height: 1.6; max-width: 90%; margin: 0 auto;">
    <h2 style="color: #333; text-align: start;">Hello ${name ? name : ""}</h2>
    <p style="color: #555; text-align: justify;">${msg}</p>

    <div style="margin-top: 1.5rem; text-align: center;">
        <div style="background-color: #FFED4A; padding: 0.5rem; border-radius: 0.25rem; box-shadow: 0 2px 5px rgba(0,0,0,0.1); display: inline-block;">
            <strong style="font-size: 1.25rem;">${data ? data : ''}</strong>
        </div>
    </div>

    <div style="margin-top: 2rem; text-align: center; color: #777;">
        <p style="font-size: 0.9rem;">Thank you for using Saarthi. We are here to support you!</p>
    </div>
</div>
    `,
    });

    console.log("Done with transporter");
    console.log("Returning info -> ", info);
    return info;
};

module.exports = { mailSender };
