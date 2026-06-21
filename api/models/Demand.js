import mongoose from 'mongoose';

const demandSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ['Books', 'Lab Coat', 'Drafter', 'Notes', 'Others'],
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

export default mongoose.model('Demand', demandSchema);
