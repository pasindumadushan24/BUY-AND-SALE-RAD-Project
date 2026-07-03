"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const Vehicle_1 = __importDefault(require("../models/Vehicle"));
const router = express_1.default.Router();
// Multer setup
const storage = multer_1.default.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage });
//Create Vehicle
router.post("/", upload.array("images", 5), async (req, res) => {
    try {
        console.log("🔥 POST HIT");
        console.log("BODY:", req.body);
        console.log("FILES:", req.files);
        const files = req.files;
        const imagePaths = files ? files.map((f) => f.filename) : [];
        const vehicle = await Vehicle_1.default.create({
            ...req.body,
            images: imagePaths,
        });
        console.log("✅ SAVED:", vehicle);
        res.status(201).json(vehicle);
    }
    catch (err) {
        console.log("❌ ERROR:", err);
        res.status(500).json({ message: "Create failed", error: err });
    }
});
//Get All Vehicle
router.get("/", async (req, res) => {
    try {
        const vehicles = await Vehicle_1.default.find();
        res.json(vehicles);
    }
    catch (err) {
        res.status(500).json({ message: "Fetch failed" });
    }
});
exports.default = router;
