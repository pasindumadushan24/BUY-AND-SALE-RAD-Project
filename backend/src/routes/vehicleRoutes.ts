import express from "express";
import multer from "multer";
import Vehicle from "../models/Vehicle";

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

/* =========================
   CREATE VEHICLE
========================= */
router.post("/", upload.array("images", 5), async (req, res) => {
  try {
    console.log("🔥 POST HIT");
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    const files = req.files as Express.Multer.File[];

    const imagePaths = files ? files.map((f) => f.filename) : [];

    const vehicle = await Vehicle.create({
      ...req.body,
      images: imagePaths,
    });

    console.log("✅ SAVED:", vehicle);

    res.status(201).json(vehicle);
  } catch (err) {
    console.log("❌ ERROR:", err);
    res.status(500).json({ message: "Create failed", error: err });
  }
});

/* =========================
   GET ALL VEHICLES
========================= */
router.get("/", async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ message: "Fetch failed" });
  }
});

export default router;