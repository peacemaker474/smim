'use strict';
import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  targetAge: { type: Number, required: true },
  hashtag: [{ type: String, required: true }],
  meta: {
    views: { type: Number, default: 0, required: true },
    likes: { type: Number, default: 0, required: true },
  },
  // comments: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Comment' }],
  createAt: { type: Date, required: true, default: Date.now },
  updateAt: { type: Date, default: Date.now, required: true },
  being: { type: Boolean, default: true }, // 게시글의 삭제 유무
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
});

const Post = mongoose.model('Post', postSchema);
// create data model(name of model , shape of data)

export default Post;
