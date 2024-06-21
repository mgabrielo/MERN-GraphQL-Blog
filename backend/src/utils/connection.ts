import { connect } from "mongoose";
import "dotenv/config";

export const connectDB = async () => {
  try {
    await connect(
      `mongodb+srv://greycoinz:${process.env.MONGODB_PASSWORD}@cluster0.bmhvwra.mongodb.net/mern-graphql-blog?retryWrites=true&w=majority`
    );
    console.log("Database Connected");
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
