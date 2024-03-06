import { BadRequestError } from '../errors/bad-request-error';
import { InternalServerError } from '../errors/internal-server-error';
import { CustomError } from '../errors/Custom-error';
import { DatabaseConnectionError } from '../errors/database-connection-error';
import { NotFoundError } from '../errors/not-found-error';

import { User, UserAttrs, UserAttrsOptional } from '../models/User';

async function saveNewUserInfo(userData: UserAttrs) {
  try {
    const user = await User.build(userData);
    await user.save();

    return user;
  } catch (err) {
    console.error(err);
    throw new InternalServerError(
      'Internal Server Error while saving User Data'
    );
  }
}

async function updateUserInfo(email: string, userData: UserAttrsOptional) {
  try {
    const user = await User.updateOne({ email: email }, { userData });
    return user;
  } catch (err: any) {
    console.error(err);
    throw new InternalServerError(
      'Internal Server Error while updating User Data'
    );
  }
}

async function getUserInfoByEmail(email: string) {
  try {
    const user = await User.findOne({ email: email });
    return user;
  } catch (err: any) {
    throw new InternalServerError(
      'Internal Server Error while getting User Data'
    );
  }
}

async function getUserInfoById(id: string) {
  try {
    const user = await User.findOne({ _id: id });
    return user;
  } catch (err: any) {
    throw new InternalServerError(
      'Internal Server Error while getting User Data'
    );
  }
}
export { saveNewUserInfo, updateUserInfo, getUserInfoByEmail, getUserInfoById };
