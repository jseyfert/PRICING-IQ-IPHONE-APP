'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const nodemailer = require('nodemailer');

const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

exports.sendEmailConfirmation = functions.database.ref('/items/{uid}/response').onWrite((change, context) => {
  const snapshot = change.after;
  const val = snapshot.val();

  if (!val) {
    return null;
  }

  const price = val.price
  const uid = context.params.uid

  return admin.database().ref('/items/' + uid).once('value').then((snapshot) => {

    let settings = snapshot.val().settings

    if (settings) {
      if (settings.emailNotification) {

        const mailOptions = {
          from: '"frigginyeah" <no-reply@frigginyeah.com>',
          to: settings.email,
        };

        mailOptions.subject = 'FrigginYeah update!';
        mailOptions.text = 'latest price = ' + price

        return mailTransport.sendMail(mailOptions)

        .then(() => console.log('email sent!!!'))
        .catch((error) => console.error('There was an error while sending the email:', error));
      }
    }
  }).catch((error) => {
    console.log('Error1:',error.message);
  });

});
