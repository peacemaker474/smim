'use strict';
import mongoose from 'mongoose';

const likeSchema = new mongoose.Schema({
  like: { type: Boolean, required: true },
  writer_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  post_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Post' },
  createAt: { type: Date, required: true, default: Date.now },
});

const Like = mongoose.model('Like', likeSchema);

export default Like;
