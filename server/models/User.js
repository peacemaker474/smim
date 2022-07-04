import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  nickname: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  imageUrl: String,
  createAt: { type: Date, default: Date.now, required: true },
  birthday: { type: Number, required: true },
  being: { type: Boolean, default: true, require: true }, // 탈퇴유무
  posts: [{ type: String }], // 작성한 게시글
  bookmarks: [{ type: String }], // 즐겨찾기한 게시글
  socialOnly: { type: Boolean, default: false },
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 5);
  }
});

const User = mongoose.model('User', userSchema);

export default User;
