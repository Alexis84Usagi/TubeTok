const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

// 📂 Config du stockage vidéos
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Rendre les fichiers statiques accessibles
app.use("/uploads", express.static("uploads"));
app.use(express.static("public"));

// 📤 Upload vidéo
app.post("/upload", upload.single("video"), (req, res) => {
  res.json({ url: `/uploads/${req.file.filename}` });
});

// 📺 Lister vidéos
app.get("/videos", (req, res) => {
  fs.readdir("uploads", (err, files) => {
    if (err) return res.status(500).json(err);
    res.json(files.map(f => `/uploads/${f}`));
  });
});

// 🚀 Lancer serveur
app.listen(PORT, () => console.log(`✅ Serveur lancé sur http://localhost:${PORT}`));
