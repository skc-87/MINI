const express = require("express");
const app = express();
require("dotenv").config();
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const { cloudinaryConnect } = require("./config/cloudinary");

const userRoutes = require("./routes/User");
const tourRoutes = require("./routes/Tours");
const walletRoutes = require("./routes/transaction.route");
const paymentRoutes = require("./routes/Payment");

// dotenv.config();
const PORT = process.env.PORT || 4000;

// miiddlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    // It will entertain the request of frontend and make it interact with backend
    // origin: "http://localhost:3000",
    origin: "*",
    credentials: true,
  })
);

// connect with dataBase
database.connect();

// default routes
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running....",
  });
});

// connect cloudinary
cloudinaryConnect();

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

//routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/tour", tourRoutes);
app.use("/api/v1/wallet", walletRoutes);
app.use("/api/v1/payment", paymentRoutes);

// start  the app
app.listen(PORT, () => {
  console.log(`App is running at ${PORT} successfully...`);
});
