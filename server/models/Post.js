'use strict';
import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: String,
  textContent: String,
  targetAge: Number,
  tagArray: [{ type: String }],
  meta: {
    views: { type: Number, default: 0, required: true },
  },
  // comments: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Comment' }],
  // writer_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  createAt: { type: Date, required: true, default: Date.now },
  updateAt: { type: Date },
  being: { type: Boolean, default: true }, // 게시글의 삭제 유무
});

const Post = mongoose.model('Post', postSchema);
// create data model(name of model , shape of data)

export default Post;
