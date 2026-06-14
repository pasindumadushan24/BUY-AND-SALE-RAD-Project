import mongoose from "mongoose";

export interface IVehicle {
  title: string;
  price: string;
  location: string;
  description: string;
  images: string[];
}

const VehicleSchema = new mongoose.Schema<IVehicle>({
  title: String,
  price: String,
  location: String,
  description: String,
  images: [String],
});

export default mongoose.model<IVehicle>("Vehicle", VehicleSchema);