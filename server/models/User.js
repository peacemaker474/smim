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
  state: { type: Boolean, default: true, require: true }, // 탈퇴유무
  posts: [{ type: String }], // 작성한 게시글
  likes: [{ type: String }], // 좋아요한 게시글
  bookmarks: [{ type: String }], // 즐겨찾기한 게시글
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    console.log('Users password:', this.password);
    this.password = await bcrypt.hash(this.password, 5);
    console.log('Hashed password', this.password);
  }
});

const User = mongoose.model('User', userSchema);

export default User;
