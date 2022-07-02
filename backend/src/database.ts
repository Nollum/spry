import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL as string);
        console.log('Connected to DB');
    } catch {
        console.log('Error connecting to DB');
    }
};

export default connectDB;