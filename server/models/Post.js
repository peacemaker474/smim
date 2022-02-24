'use strict';
import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: String,
  textContent: String,
  targetAge: Number,
  tagData: [{ type: String }],
  meta: {
    views: { type: Number, default: 0, required: true },
  },
  // comments: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Comment' }],
  // writer_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  createAt: { type: Date, required: true, default: Date.now },
});

const Post = mongoose.model('Post', postSchema);
// create data model(name of model , shape of data)

export default Post;
