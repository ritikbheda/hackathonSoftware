import mongoose, { Date } from 'mongoose';

interface AuthUserAttrs {
  email: string;
  token: string;
  role: string;
}

interface AuthUserModel extends mongoose.Model<AuthUserDoc> {
  build(attrs: AuthUserAttrs): AuthUserDoc;
}

interface AuthUserDoc extends mongoose.Document {
  email: string;
  verified: boolean;
  last_login: Date;
  role: string;
  token: string;
}

const AuthUserSchema = new mongoose.Schema({
  email: {
    required: true,
    type: String,
    unique: true,
  },
  verified: {
    type: Boolean,
    default: undefined,
  },
  last_login: {
    type: Date,
  },
  token: {
    type: String,
  },
  role: {
    required: true,
    type: String,
  },
});

AuthUserSchema.statics.build = (attrs: AuthUserAttrs) => {
  return new AuthUser(attrs);
};

const AuthUser = mongoose.model<AuthUserDoc, AuthUserModel>(
  'AuthUser',
  AuthUserSchema
);

export { AuthUser, AuthUserAttrs };
