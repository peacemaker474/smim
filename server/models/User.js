import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  nickname: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  imageUrl: String,
  birthdate: { type: Date, default: Date.now, required: true },
  birthday: { type: Number, required: true },
  state: Boolean, // 탈퇴유무
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
});

userSchema.pre('save', async function () {
  console.log('Users password:', this.password);
  this.password = await bcrypt.hash(this.password, 5);
  console.log('Hashed password', this.password);
});

const User = mongoose.model('User', userSchema);

export default User;
