import mongoose from "mongoose";

function connectDB() {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("DB connected");
    })
    .catch((error) => {
      console.log("Error connecting to DB", error.message);
    });
}

export default connectDB;
