import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  writer: { type: String, required: true },
  post_id: { type: String, required: true },
  createAt: { type: Date, required: true, default: Date.now },
  parent_id: { type: String },
  children: [{ type: String, default: null, required: true }],
  like_count: { type: Number, required: true, default: 0 },
  like_users: [{ type: String, default: null, required: true }],
  complain_count: { type: Number, required: true, default: 0 },
});

const Comment = mongoose.model('Comment', commentSchema);
// create data model(name of model , shape of data)

export default Comment;
