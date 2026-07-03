"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const VehicleSchema = new mongoose_1.default.Schema({
    title: String,
    price: String,
    location: String,
    description: String,
    images: [String],
});
exports.default = mongoose_1.default.model("Vehicle", VehicleSchema);
