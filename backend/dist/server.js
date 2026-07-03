"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_dns_1 = __importDefault(require("node:dns"));
node_dns_1.default.setServers(["8.8.8.8", "8.8.4.4"]);
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const postRoutes_1 = __importDefault(require("./routes/postRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/auth", authRoutes_1.default);
app.use("/uploads", express_1.default.static("uploads"));
app.use("/api/posts", postRoutes_1.default);
mongoose_1.default
    .connect(process.env.MONGO_URI)
    .then(() => {
    console.log("MongoDB Connected");
    app.listen(5000, () => {
        console.log("Server running on port 5000");
    });
});
