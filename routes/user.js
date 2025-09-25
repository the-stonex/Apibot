const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ error: "Access denied" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: "Invalid token" });
    req.userId = decoded.id;
    next();
  });
};

// Get user profile
router.get("/profile", verifyToken, (req, res) => {
  User.findById(req.userId, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results[0]);
  });
});

module.exports = router;
