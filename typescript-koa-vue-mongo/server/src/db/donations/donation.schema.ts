import { Schema } from 'mongoose';

const DonationSchema = new Schema({
  amount: {
    type: Number,
    min: 1,
    required: true,
  },
  currency: {
    type: String,
    required: true,
    enum: ['USD', 'EUR', 'GBP', 'RUB'],
  },
});

export default DonationSchema;
