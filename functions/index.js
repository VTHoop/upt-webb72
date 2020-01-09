const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require('cors')({origin: true});
admin.initializeApp();

const mailUser = functions.config().mail.user;

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: mailUser,
        pass: functions.config().mail.password
    }
});

exports.sendPin = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
      
        const dest = req.query.dest;
        const pin = req.query.pin;

        const mailOptions = {
            from: `UPT 72 Webb <${mailUser}>`, 
            to: dest,
            subject: 'UPT 72-09 Webb Registration Pin', 
            html: `<div style="font-size: 30px; margin-bottom: 20px;">Thank you for registering for UPT 72-09 Webb</div>
            <div style="font-size: 16px; margin-bottom: 20px;">In order to complete your registration, you must enter the provided pin on the Pin Verification page that you are currently on or log back in with the password that you provided and enter the following Pin.</div>
            <div style="font-size: 16px;"><span>Your pin is: </span><span style="font-weight: 700;">${pin}</span></div>
            `
        };
  
        return transporter.sendMail(mailOptions, (error, info) => {
            if(error){
                return res.send(error.toString());
            }
            return res.send('Sent');
        });
    });    
});
