import User from "../models/User.js";

export const getProfile = async (req, res) => {
  res.json(req.user);
};

export const updateProfile = async (req, res) => {
  try {
    const allowed = [
      "name",
      "role",
      "skills",
      "experienceLevel",
      "bio",
      "github",
      "lookingFor",
    ];

    const updates = {};
    for (const key of allowed) {
      if (req.body[key] !== undefined) updates[key] = req.body[key];
    }

    if (updates.skills !== undefined) {
      if (!Array.isArray(updates.skills)) {
        return res.status(400).json({ message: "skills must be an array" });
      }
      updates.skills = updates.skills
        .map((s) => String(s).trim().toLowerCase())
        .filter(Boolean)
        .slice(0, 15);
    }

    const user = await User.findByIdAndUpdate(req.user._id, updates, {
      new: true,
      runValidators: true,
    });

    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};