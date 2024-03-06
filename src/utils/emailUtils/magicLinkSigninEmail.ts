import { createTransporter } from './createTransporter';

export const magicLinkSigninEmail = async (email: string, token: string) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: email,
      subject: 'Welcome to this App',
      html: `<p>Please click the link to sign in:</p><br/><a href="/${token}">${token}</a>`,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};
