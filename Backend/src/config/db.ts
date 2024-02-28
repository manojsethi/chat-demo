import { configDotenv } from "dotenv";
import mongoose from "mongoose";
configDotenv();
export const connectdb = async () => {
  try {
    await mongoose
      .connect(
        "mongodb+srv://Prsnt:prsnt123@cluster99.7bmrjhw.mongodb.net/reactDashboard"
      )
      .then(() => {
        console.log("Connected db....");
      })
      .catch((error) => {
        console.log(error, "Disconnected");
      });
  } catch (err) {
    console.log(err);
  }
};
