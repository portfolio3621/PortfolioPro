const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const app = express();
const { connectDB } = require("./config/db");
const UserRoute = require("./routes/userRoute");
const PortfolioRoute = require("./routes/portfolioRoute");
const BillRoute = require("./routes/BillRouter");
const AdminRoute = require("./routes/Admin");

//Middle ware
connectDB();
app.use(cookieParser());
app.use(express.json());
const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.FRONTEND_ADMIN_URL,
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server running successfully",
  });
});
app.use("/api/v1", UserRoute);
app.use("/api/v1", PortfolioRoute);
app.use("/api/v1/admin", AdminRoute);
app.use("/api/v1/bill", BillRoute);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
