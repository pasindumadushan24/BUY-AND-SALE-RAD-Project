"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const auth_1 = require("../middleware/auth");
const postController_1 = require("../controllers/postController");
const router = express_1.default.Router();
const storage = multer_1.default.diskStorage({
    destination(req, file, cb) {
        cb(null, "uploads/");
    },
    filename(req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage });
//PROTECTED ROUTE
router.post("/", auth_1.auth, upload.array("images", 5), postController_1.createPost);
router.get("/", postController_1.getPosts);
router.get("/my-posts", auth_1.auth, postController_1.getMyPosts);
router.put("/:id", auth_1.auth, postController_1.updatePost);
router.delete("/:id", auth_1.auth, postController_1.deletePost);
exports.default = router;
