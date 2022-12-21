import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  targetId: { type: String },
  target: { type: String },
  totalCount: { type: Number },
  reporter: [{ type: String }],
  typeCount: {
    sexual: {
      content: { type: String, default: '성희롱' },
      count: { type: Number, default: 0, required: true },
    },
    abuse: {
      content: { type: String, default: '욕설' },
      count: { type: Number, default: 0, required: true },
    },
    malicious: {
      content: { type: String, default: '악의적' },
      count: { type: Number, default: 0, required: true },
    },
    spam: {
      content: { type: String, default: '스팸(광고)' },
      count: { type: Number, default: 0, required: true },
    },
  },
});
// Report type : 1 - 성희롱, 2 - 욕설, 3 - 악의적, 4 : 스팸(광고)

const Report = mongoose.model('Report', reportSchema);

export default Report;
