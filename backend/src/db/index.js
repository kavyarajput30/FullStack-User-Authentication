import mongoose from 'mongoose';

const connectDB = async () => {

    try {
      const connectInstance= await  mongoose.connect(process.env.MONGO_URL);
      console.log("MongoDB connection sucessful");
      console.log("DB Host", connectInstance.connection.host);
    }

    catch (err) { 
        console.log("MONGODB CONNECTION ERROR: ", err);
        process.exit(1);
     }
}

export default connectDB;