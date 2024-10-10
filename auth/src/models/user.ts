import mongoose from 'mongoose';
import { Password } from '../services/password';

// Interface describing the properties required to create a new User
interface UserAttrs {
  email: string;
  password: string;
}

// Interface describing the properties of the User Model
interface UserModel extends mongoose.Model<UserDocument> {
  build(attrs: UserAttrs): UserDocument;
}

// Interface describing the properties of a User Document
interface UserDocument extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
      },
      versionKey: false,
    },
  }
);
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

const User = mongoose.model<UserDocument, UserModel>('User', userSchema);

const user = User.build({
  email: 'test@email.com',
  password: 'password',
});

export { User };
