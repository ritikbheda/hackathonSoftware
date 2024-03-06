import express from 'express';
import {
  saveNewUserController,
  updateUserController,
  getUserByEmailController,
  getUserByIdController,
} from '../controllers/user.controllers';

const router = express.Router();

router.post('/');
router.post('/saveUser', saveNewUserController);
// router.post('/updateUser', )

export { router as userRoutes };
