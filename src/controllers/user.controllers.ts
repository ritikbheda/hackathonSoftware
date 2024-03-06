import { body, param } from 'express-validator';
import requireAuth from '../middleware/require-auth';
import {
  getUserInfoByEmail,
  getUserInfoById,
  saveNewUserInfo,
  updateUserInfo,
} from '../services/user.services';
import { validate } from '../middleware/validate';

const saveNewUserController = [
  requireAuth,
  validate([
    body('first_name')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('firstName must be between 4 and 20 characters'),

    body('last_name')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('lastName must be between 4 and 20 characters'),

    body('team_role')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('teamRole must be between 4 and 20 characters'),
  ]),
  async (req: any, res: any) => {
    try {
      const { first_name, last_name, team_role } = req.body;
      const email = req.user.email;
      const user = saveNewUserInfo({
        first_name,
        last_name,
        email,
        team_role,
      });
      res.success(201, 'Successfully saved User', user);
    } catch (err: any) {
      res.apiError(err.statusCode, err.errorType, err.message);
    }
  },
];

const updateUserController = [
  requireAuth,
  validate([
    body('t_shirt_size')
      .optional()
      .isLength({ min: 4, max: 20 })
      .withMessage('t_shirt_size must be between 4 and 20 characters'),
    body('team_role')
      .optional()
      .isLength({ min: 4, max: 20 })
      .withMessage('team_role must be between 4 and 20 characters'),
    body('team')
      .optional()
      .isLength({ min: 4, max: 20 })
      .withMessage('team must be between 4 and 20 characters'),
    body('challenge_set')
      .optional()
      .isLength({ min: 4, max: 20 })
      .withMessage('challenge_set must be between 4 and 20 characters'),
  ]),
  async function (req: any, res: any) {
    try {
      const user = await updateUserInfo(req.user.email, {
        t_shirt_size: req.body.t_shirt_size,
        team_role: req.body.team_role,
        team: req.body.team,
        challenge_set: req.body.challenge_set,
      });
    } catch (err: any) {
      res.apiError(err.statusCode, err.errorType, err.message);
    }
  },
];

const getUserByEmailController = [
  validate([
    param('email').not().isEmpty().withMessage('email must be provided'),
  ]),
  async (req: any, res: any) => {
    try {
      const user = await getUserInfoByEmail(req.params.email);
      res.success(200, 'Get user success', user);
    } catch (err: any) {
      res.apiError(err.statusCode, err.errorType, err.message);
    }
  },
];

const getUserByIdController = [
  validate([param('id').not().isEmpty().withMessage('id must be provided')]),
  async (req: any, res: any) => {
    try {
      const user = await getUserInfoById(req.params.email);
      res.success(200, 'Get user success', user);
    } catch (err: any) {
      res.apiError(err.statusCode, err.errorType, err.message);
    }
  },
];

export {
  saveNewUserController,
  updateUserController,
  getUserByEmailController,
  getUserByIdController,
};
