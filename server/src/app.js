import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import financeRoutes from "./routes/financeRoutes.js";
import schemesRoutes from "./routes/schemesRoutes.js";
import weatherRoutes from "./routes/weatherRoutes.js";
import mandiRoutes from "./routes/mandiRoutes.js";
import yieldRoutes from "./routes/yieldRoutes.js";
import healthRoutes from "./routes/healthRoutes.js";
import creditRoutes from "./routes/creditRoutes.js";
import logisticsRoutes from "./routes/logisticsRoutes.js";

dotenv.config();

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "2mb" }));

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Jan Jeevan backend is running",
    mongo: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    time: new Date().toISOString(),
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/finance", financeRoutes);
app.use("/api/schemes", schemesRoutes);
app.use("/api/weather", weatherRoutes);
app.use("/api/mandi-prices", mandiRoutes);
app.use("/api/yield", yieldRoutes);
app.use("/api/health", healthRoutes);
app.use("/api/credit", creditRoutes);
app.use("/api/logistics", logisticsRoutes);

app.use((req, res) => {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.path}` });
});

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.message);
  res.status(500).json({ message: "Internal server error." });
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

function startServer() {
  app.listen(PORT, () => {
    console.log(`🚀 Jan Jeevan server on http://localhost:${PORT}`);
    console.log(`   Health: http://localhost:${PORT}/api/health`);
  });
}

if (MONGO_URI) {
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log("✅ MongoDB connected");
      startServer();
    })
    .catch((err) => {
      console.error("⚠️  MongoDB failed:", err.message);
      console.error("   Auth/finance need Mongo. Other APIs still work.");
      startServer();
    });
} else {
  console.warn("⚠️  No MONGO_URI — auth/finance disabled until configured.");
  startServer();
}
