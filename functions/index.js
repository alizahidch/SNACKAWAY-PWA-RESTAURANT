const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const cors = require('cors')({origin: true});
const admin = require('firebase-admin');
admin.initializeApp();

var transporter = nodemailer.createTransport({
    host: 'hgws19.win.hostgator.com',
    port: 465,
    auth: {
        user: 'wordpress@mvac.live',
        pass: 'syoR03?6'
    }
  });

  exports.sendEmail = functions.firestore
  .document('notifications/{orderId}')
  .onCreate((snap, context) => {
      const mailOptions = {
          from: `admin@snackaway.com`,
          to: snap.data().email,
          subject: 'SNACKAWAY ORDER UPDATES',
          html: `<h1>NEW ORDER</h1>
          
                              <p>
                                 <b></b>${snap.data().message}<br>
                              </p>
                              <br>
                              <h3>BEST REGARDS</h3>
                              <br>
                              <h3>SNACK AWAY TEAM </h3>
                              `
      };
      return transporter.sendMail(mailOptions, (error, data) => {
          if (error) {
              console.log(error)
              return
          }
          console.log("Sent!")
      });
  });