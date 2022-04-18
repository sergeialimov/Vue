import { Document, Model } from 'mongoose';

export interface IDonation {
  amount: number;
  currency: string;
}

export interface IDonationDocument extends IDonation, Document {}

export interface IDonationModel extends Model<IDonationDocument> {}
