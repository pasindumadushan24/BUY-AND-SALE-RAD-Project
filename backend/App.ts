import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import vehicleRoutes from "./src/routes/vehicleRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

// Vehicle Routes
app.use("/api/vehicles", vehicleRoutes);

mongoose
  .connect("mongodb://127.0.0.1:27017/quickmarket")
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("Backend Running");
});

app.listen(3000, () => {
  console.log("Server Running On Port 3000");
});

export default app;