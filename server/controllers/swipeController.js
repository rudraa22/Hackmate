import mongoose from "mongoose";
import User from "../models/User.js";
import Swipe from "../models/Swipe.js";
import Match from "../models/Match.js";

const PUBLIC_FIELDS =
  "name role skills experienceLevel bio github lookingFor";

export const getDeck = async (req, res) => {
  try {
    const swiped = await Swipe.distinct("toUser", { fromUser: req.user._id });

    const users = await User.find({
      _id: { $nin: [...swiped, req.user._id] },
    })
      .select(PUBLIC_FIELDS)
      .limit(20);

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const swipe = async (req, res) => {
  try {
    const { toUserId, direction } = req.body;
    const me = req.user._id;

    if (!mongoose.isValidObjectId(toUserId)) {
      return res.status(400).json({ message: "Invalid user id" });
    }
    if (!["like", "pass"].includes(direction)) {
      return res.status(400).json({ message: "direction must be like or pass" });
    }
    if (String(toUserId) === String(me)) {
      return res.status(400).json({ message: "You cannot swipe on yourself" });
    }

    const target = await User.findById(toUserId);
    if (!target) {
      return res.status(404).json({ message: "User not found" });
    }

    const already = await Swipe.findOne({ fromUser: me, toUser: toUserId });
    if (already) {
      return res.status(400).json({ message: "You already swiped on this user" });
    }

    await Swipe.create({ fromUser: me, toUser: toUserId, direction });

    if (direction === "like") {
      const theyLikedMe = await Swipe.findOne({
        fromUser: toUserId,
        toUser: me,
        direction: "like",
      });

      if (theyLikedMe) {
        const pairKey = [String(me), String(toUserId)].sort().join("_");
        const match = await Match.findOneAndUpdate(
          { pairKey },
          { $setOnInsert: { users: [me, toUserId], pairKey } },
          { upsert: true, new: true }
        );
        return res.status(201).json({ matched: true, match });
      }
    }

    return res.status(201).json({ matched: false });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMatches = async (req, res) => {
  try {
    const matches = await Match.find({ users: req.user._id }).populate(
      "users",
      PUBLIC_FIELDS
    );

    const result = matches.map((m) => ({
      _id: m._id,
      createdAt: m.createdAt,
      user: m.users.find((u) => String(u._id) !== String(req.user._id)),
    }));

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};