import {
  generateLoginToken,
  loginUser,
  registerUser,
} from '../services/authUser.services';
import { body, param } from 'express-validator';
import mongoose from 'mongoose';

import { validate } from '../middleware/validate';
import requireAuth from '../middleware/require-auth';
import { generateToken } from '../utils/authUtils';
import { magicLinkSigninEmail } from '../utils/emailUtils/';

const registerUserContoller = [
  validate([
    body('email')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('email must be between 4 and 20 characters'),
  ]),

  async (req: any, res: any) => {
    try {
      const { email } = req.body;

      const user = await registerUser(email);
      await magicLinkSigninEmail('ritik.bheda@gmail.com', user.token);

      res.success(201, 'User registered Successfully');
    } catch (error: any) {
      // console.log(error);
      res.apiError(error.statusCode, error.errorType, error.message);
    }
  },
];

const generateLoginLinkController = [
  validate([
    body('email')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('email must be between 4 and 20 characters'),
  ]),
  async (req: any, res: any) => {
    try {
      const { email } = req.body;
      const loginToken = await generateLoginToken(email);
      await magicLinkSigninEmail('ritik.bheda@gmail.com', loginToken);
      res.success(200, 'login link link generated and sent successfully');
    } catch (err: any) {
      res.apiError(err.statusCode, err.errorType, err.message);
    }
  },
];

const loginUserContoller = [
  validate([
    param('token').not().isEmpty().withMessage('token must be provided'),
  ]),
  async (req: any, res: any) => {
    try {
      const { token } = req.params;
      // validate the token, if valid generate jwt token and send in cookie response. if invalid, link already used or expired
      const user = await loginUser(token);

      const authToken = await generateToken(user._id, user.role);
      res.cookie('authToken', authToken, { httpOnly: true, maxAge: 3600000 });

      res.success(200, 'login successful', user);
    } catch (err: any) {
      res.apiError(err.statusCode, err.errorType, err.message);
    }
  },
];

const logoutController = [
  async (req: any, res: any) => {
    res.cookie('authToken', '', { httpOnly: true, expires: new Date(0) });

    res.success(200, 'User logged out successfully');
  },
];

const protectedRoute = [
  requireAuth,
  async (req: any, res: any) => {
    // console.log('user:', req.user);
    res.success(200, 'User is logged in ');
  },
];

export {
  registerUserContoller,
  loginUserContoller,
  generateLoginLinkController,
  logoutController,
  protectedRoute,
};
