import express from 'express';
import {
  registerUserContoller,
  loginUserContoller,
  generateLoginLinkController,
  logoutController,
  protectedRoute,
} from '../controllers/authUser.controllers';

const router = express.Router();

router.post('/createUser', registerUserContoller);
router.get('/generateLoginLink', generateLoginLinkController);
router.get('/login/:token', loginUserContoller);
router.post('/logout', logoutController);
router.get('/protectedRoute', protectedRoute);

export { router as authUserRouter };
