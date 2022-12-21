import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 4,
    maxlength: 12,
    match: /^[a-zA-Z0-9]/,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match:
      /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/,
  },
  nickname: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 8,
    match: /^[가-힣a-zA-Z0-9]/,
  },
  password: { type: String, required: true },
  imageUrl: { type: String, default: 'users/default.png' },
  createAt: { type: Date, default: Date.now, required: true },
  birthday: { type: Number, required: true },
  ageGroup: { type: Number },
  being: { type: Boolean, default: true, require: true }, // 탈퇴유무
  posts: [{ type: String }], // 작성한 게시글
  bookmarks: [{ type: String }], // 즐겨찾기한 게시글
  expiredAt: {
    type: Date,
    expires: 0,
  },
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 5);
  }
});

const User = mongoose.model('User', userSchema);

export default User;
