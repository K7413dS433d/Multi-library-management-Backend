import mongoose from "mongoose";

export const connection = async () => {
  await mongoose
    .connect(process.env.CONNECTION_URI)
    .then(() => console.log("database connected successfully"))
    .catch((error) => console.log(error.message));
};
