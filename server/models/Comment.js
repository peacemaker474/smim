'use strict';
import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  writer_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  post_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Post' },
  createAt: { type: Date, required: true, default: Date.now },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  comment_count: Number,
  like_count: Number,
  complain_count: Number,
  state: { type: Boolean, required: true, default: true }, // 삭제유무
});

const Comment = mongoose.model('Comment', commentSchema);
// create data model(name of model , shape of data)

export default Comment;
