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
    pinnedCmnt: { type: String, default: undefined },
    answer: { type: Boolean, default: false, required: true },
  },
  createAt: { type: Date, required: true, default: Date.now },
  updateAt: { type: Date, default: Date.now, required: true },
  owner: { type: String, required: true },
});

const Post = mongoose.model('Post', postSchema);
// create data model(name of model , shape of data)

export default Post;
