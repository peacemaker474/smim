'use strict';
import mongoose from 'mongoose';

const bookmarkSchema = new mongoose.Schema({
  markState: Boolean,
  writer_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  post_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Post' },
});

const Bookmark = mongoose.model('Bookmark', bookmarkSchema);
// create data model(name of model , shape of data)

export default Bookmark;
