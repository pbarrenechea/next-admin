import mongoose, { InferSchemaType, Schema } from 'mongoose';

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  photoUrl: {
    type: String,
    required: false,
  },
  accountId: {
    type: String,
    required: false,
  },
  provider: {
    type: String,
    required: false,
  },
  active: {
    type: Boolean,
    required: false,
    default: true,
  },
  jobTitle: {
    type: String,
    required: false,
  },
  location: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: false,
  },
});

export type UserType = InferSchemaType<typeof userSchema>;

export default mongoose.models.Users || mongoose.model('Users', userSchema);
