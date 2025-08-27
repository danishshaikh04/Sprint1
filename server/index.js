import express from "express";
import cors from "cors";
import multer from "multer";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import storyRoutes from "./routes/stories.js";
import commentRoutes from "./routes/comments.js";
import likeRoutes from "./routes/likes.js";
import relationshipRoutes from "./routes/relationships.js";
import path from "path";
import dotenv from "dotenv";

const app = express();

dotenv.config();

// JWT middleware
export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtSecretKey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    req.user = userInfo; // attach user info
    next();
  });
};

// Middlewares
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join("../client/public/upload")); // ensure this path exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Upload route
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    if (!req.file) return res.status(400).json("No file uploaded.");
    res.status(200).json({ filename: req.file.filename }); // return object
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});



// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/stories", storyRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/relationships", relationshipRoutes);

// Serve uploaded images statically
app.use("/upload", express.static(path.join("../client/public/upload")));

app.listen(8800, () => {
  console.log("API working on port 8800!");
});
