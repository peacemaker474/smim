'use strict';
import mongoose from 'mongoose';

const postTagSchema = new mongoose.Schema({
  post_id: String,
  tag_id: String,
});

const PostTag = mongoose.model('PostTag', postTagSchema);
// create data model(name of model , shape of data)

export default PostTag;
