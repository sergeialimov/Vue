import mongoose from 'mongoose';
import config from 'config';

const dbConfig: Record<string, string> = config.get('db');
const {
  protocol, options, username, password,
} = dbConfig;

let db: mongoose.Connection;

export const connectDb = () => {
  const uri = `${protocol}${username}:${password}${options}`;

  if (db) {
    return;
  }
  try {
    mongoose.connect(uri);

    db = mongoose.connection;

    db.once('open', async () => {
      console.log('Connected to db');
    });

    db.on('error', () => {
      console.log('Error connecting to db');
    });
  } catch (error) {
    console.error(error.message || 'Error while connecting to db');
  }
};

export const disconnectDb = () => {
  if (!db) {
    return;
  }

  mongoose.disconnect();
};
