import { model } from 'mongoose';
import { IDonationModel } from './donation.types';
import DonationSchema from './donation.schema';

const DonationModel = model<IDonationModel>('donations', DonationSchema);

export default DonationModel;
