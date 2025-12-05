const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

// Ưu tiên port Pterodactyl
const port = process.env.SERVER_PORT || process.env.PORT || 3000;

// Tự phát hiện thư mục web:
// - Nếu tồn tại /web-mobile/index.html -> dùng web-mobile
// - Ngược lại -> dùng root (__dirname)
let webDir;
if (fs.existsSync(path.join(__dirname, "web-mobile", "index.html"))) {
  webDir = path.join(__dirname, "web-mobile");
  console.log("Using web dir:", webDir);
} else {
  webDir = __dirname;
  console.log("Using web dir (root):", webDir);
}

// Serve static
app.use(express.static(webDir));

// Route / -> index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(webDir, "index.html"));
});

app.listen(port, "0.0.0.0", () => {
  console.log("Server running on port", port);
});
