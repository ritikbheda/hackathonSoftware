import mongoose from 'mongoose';

interface UserAttrsOptional {
  first_name?: string;
  last_name?: string;
  t_shirt_size?: string;
  team_role?: string;
  team?: string;
  challenge_set?: string;
}

interface UserAttrs {
  first_name: string;
  last_name: string;
  email: string;
  t_shirt_size?: string;
  team_role: string;
  team?: string;
  challenge_set?: string;
  // name of program and year
  // institute
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

interface UserDoc extends mongoose.Document {
  first_name: string;
  last_name: string;
  email: string;
  t_shirt_size: string;
  team_role: string;
  team: string;
  challenge_set: string;
  // name of program and year
  // institute
}

const UserSchema = new mongoose.Schema({
  first_name: {
    required: true,
    type: String,
  },
  last_name: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  t_shirt_size: {
    type: String,
  },
  team_role: {
    required: true,
    type: String,
  },
  team: {
    type: String,
  },
  challenge_set: {
    type: String,
  },
});

UserSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', UserSchema);

export { User, UserAttrs, UserAttrsOptional };
