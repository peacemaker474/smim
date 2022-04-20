import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  nickname: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  imageUrl: String,
  birthdate: { type: Date, default: Date.now, required: true },
  birthday: { type: Number, required: true },
  state: Boolean, // 탈퇴유무
  posts: [{ type: String }],
  likes: [{ type: String }],
});

userSchema.pre('save', async function () {
  console.log('Users password:', this.password);
  this.password = await bcrypt.hash(this.password, 5);
  console.log('Hashed password', this.password);
});

const User = mongoose.model('User', userSchema);

export default User;
