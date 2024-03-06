import jwt from 'jsonwebtoken';
require('dotenv').config();

export const generateToken = async (userId: string, role: string) => {
  return jwt.sign({ id: userId, role }, process.env.AUTH_KEY! || 'privateKey', {
    expiresIn: '1h',
  });
};
