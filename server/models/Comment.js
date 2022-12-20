import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  writer: { type: String, required: true },
  postId: { type: String, required: true },
  createAt: { type: Date, required: true, default: Date.now },
  parentId: { type: String },
  children: [{ type: String, default: null, required: true }],
  likeCount: { type: Number, required: true, default: 0 },
  likeUsers: [{ type: String, default: null, required: true }],
  block: { type: Boolean, default: false },
});

const Comment = mongoose.model('Comment', commentSchema);
// create data model(name of model , shape of data)

export default Comment;
