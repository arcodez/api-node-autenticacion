import mongoose from "mongoose";

const dbconnect = async () => {
  try {
    await mongoose.connect("mongodb://localhost/api-autenticacion", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
      useCreateIndex: true,
    });
    console.log("Db is conect");
  } catch (error) {
    console.error(error);
  }
};

dbconnect();
