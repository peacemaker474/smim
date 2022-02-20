'use strict';
import mongoose from 'mongoose';

const tagSchema = new mongoose.Schema({
  text: { type: String, required: true },
});

const Tag = mongoose.model('Tag', tagSchema);
// create data model(name of model , shape of data)

export default Tag;
