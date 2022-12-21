'use strict';
import mongoose from 'mongoose';

const likeSchema = new mongoose.Schema({
  userArray: { type: Array, default: [], required: true },
  postId: { type: String, required: true },
  createAt: { type: Date, required: true, default: Date.now },
});

const Like = mongoose.model('Like', likeSchema);

export default Like;
