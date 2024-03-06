import nodemailer, { Transporter } from 'nodemailer';

export const createTransporter = (): Transporter => {
  return nodemailer.createTransport({
    host: 'smtp.titan.email',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

// export const sendEmail = async (email: string) => {
//   try {
//     const transporter = createTransporter();

//     const mailOptions = {
//       from: process.env.EMAIL_ADDRESS,
//       to: email,
//       subject: 'Welcome to this App',
//       html: `<p>Please find your QR code below:</p><br/><a href="/google">/google</a>`,
//     };

//     const info = await transporter.sendMail(mailOptions);

//     console.log('Email sent:', info.response);
//   } catch (error) {
//     console.error('Error sending email:', error);
//     throw error;
//   }
// };
