"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const vehicleRoutes_1 = __importDefault(require("./routes/vehicleRoutes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/uploads", express_1.default.static("uploads"));
// Vehicle Routes
app.use("/api/vehicles", vehicleRoutes_1.default);
mongoose_1.default
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
exports.default = app;
