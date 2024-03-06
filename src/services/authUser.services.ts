import { BadRequestError } from '../errors/bad-request-error';
import { InternalServerError } from '../errors/internal-server-error';
import { AuthUser, AuthUserAttrs } from '../models/AuthUser';
import { MongoServerError } from 'mongodb';
import { generateMagicLinkToken } from '../utils/generateMagicLinkToken';
import { CustomError } from '../errors/Custom-error';
import { DatabaseConnectionError } from '../errors/database-connection-error';
import { NotFoundError } from '../errors/not-found-error';

async function registerUser(email: string) {
  try {
    const magicLinkToken = generateMagicLinkToken();
    const user = await AuthUser.build({
      email,
      token: magicLinkToken,
      role: 'user',
    });
    await user.save();
    return user;
  } catch (error: any) {
    // accept email(verify only one is there), generate token, send the token and save the email and token in AuthUser

    if (error instanceof MongoServerError && error.code === 11000) {
      throw new BadRequestError('email already in use');
    }

    throw new InternalServerError(error);
  }
}

async function generateLoginToken(email: string) {
  try {
    const magicLinkToken = generateMagicLinkToken();
    const user = await AuthUser.findOne({ email: email });
    if (!user) {
      throw new NotFoundError();
    }

    user.token = magicLinkToken;
    await user.save();
    return magicLinkToken;
  } catch (err: any) {
    if (err instanceof CustomError) {
      throw err;
    } else {
      throw new InternalServerError(
        'Internal Server Error while generating login link'
      );
    }
  }
}

async function loginUser(token: string) {
  // verify the token is valid, login the user by sending JWT, and update database with last_login, token

  try {
    const user = await AuthUser.findOne({ token: token });

    if (!user) {
      throw new BadRequestError('Invalid or Expired token');
    } else {
      const result = await AuthUser.updateOne(
        { _id: user._id },
        { $set: { token: '', last_login: new Date() } },
        { new: true }
      );

      if (result.modifiedCount != 1) {
        // If no documents were modified during the update, consider it an error
        throw new DatabaseConnectionError();
      }

      return user;
    }
  } catch (err) {
    if (err instanceof CustomError) {
      throw err;
    } else {
      throw new InternalServerError('Internal Server Error while logging in');
    }
  }

  // const user = await AuthUser.findOne({ token: token });

  // if (!user) {
  //   const badError = new BadRequestError('badrequestErrpr');
  //   console.log('error type: ', badError instanceof Error);
  //   console.log('BadError type: ', badError instanceof BadRequestError);
  //   throw new Error('Invalid or Expired token');
  // } else {
  //   try {
  //     const result = await AuthUser.updateOne(
  //       { _id: user._id },
  //       { $set: { token: '', last_login: new Date() } }
  //     );

  //     console.log('result is: ', result);
  //     if (result.modifiedCount != 1) {
  //       // If no documents were modified during the update, consider it an error
  //       throw new DatabaseConnectionError();
  //     }

  //     return result;
  //   } catch (err) {
  //     console.log(err);
  //     throw new InternalServerError('Internal Server Error while logging in');
  //   }
  //   }
}

export { registerUser, loginUser, generateLoginToken };
