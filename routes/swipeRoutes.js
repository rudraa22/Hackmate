import express from "express";
import {getDeck , swipe , getMatches} from "../controllers/swipeController.js";
import {protect} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/swipes/deck",protect,getDeck);
router.post("/swipes",protect,swipe);
router.get("/matches",protect,getMatches);

export default router;