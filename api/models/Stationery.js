import mongoose from 'mongoose';

const stationerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ['Books', 'Lab Coat', 'Drafter', 'Notes', 'Others'],
      required: true,
    },
    condition: {
      type: String,
      enum: ['New', 'Good', 'Used'],
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    whatsappNumber: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Stationery', stationerySchema);
