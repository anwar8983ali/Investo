require("dotenv").config();
const express = require("express");

//auth controller
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./model/UserModel"); // make sure exists

const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_KEY, {
    expiresIn: "3d",
  });
};

const { HoldingModel } = require("./model/HoldingModel");
const { PositionModel } = require("./model/PositionModel");
const { OrderModel } = require("./model/OrderModel");
const verifyUser=require("./middleware/auth");

const mongoose = require("mongoose");
const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser=require("cookie-parser");

const app = express();

app.use(cookieParser());

app.use(cors({
  origin: [
    "https://your-frontend.vercel.app",
    "https://your-dashboard.vercel.app"
  ],
  credentials: true
}));

app.use(bodyParser.json());

mongoose
  .connect(uri)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.post("/signup", async (req, res) => {
  try {
    const email = req.body.email.trim().toLowerCase();
    const password = req.body.password;
    const username = req.body.username;

    const existing = await User.findOne({ email });

    if (existing) {
      return res.json({
        success: false,
        message: "User already exists"
      });
    }

    const user = await User.create({ email, password, username });

    const token = createToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
    });

    res.json({ success: true });

  } catch (err) {
    if (err.code === 11000) {
      return res.json({
        success: false,
        message: "Email already exists"
      });
    }
    console.log(err);
  }
});

app.post("/login", async (req, res) => {
  try {
    const email = req.body.email.trim().toLowerCase(); // 🔥 FIX
    const password = req.body.password;

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "User not found"
      });
    }

    const auth = await bcrypt.compare(password, user.password);

    if (!auth) {
      return res.json({
        success: false,
        message: "Wrong password"
      });
    }

    const token = createToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
    });

    res.json({
      success: true,
      message: "Login successful"
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});

app.get("/allHoldings", async (req, res) => {
  const data = await HoldingModel.find();
  res.json(data);
});

app.get("/allPositions", async (req, res) => {
  const data = await PositionModel.find();
  res.json(data);
});

app.post("/newOrder", async (req, res) => {
  try {
    console.log("API HIT:", req.body);

    let { name, qty, price, mode } = req.body;

    const buyQty = Number(qty);
    const buyPrice = Number(price);

    const normalizedName = name.trim().toUpperCase();
    const normalizedMode = mode.toUpperCase();

    // 1️⃣ Save Order
    await OrderModel.create({
      name: normalizedName,
      qty: buyQty,
      price: buyPrice,
      mode: normalizedMode,
    });

    // 2️⃣ Find existing holding
    let existing = await HoldingModel.findOne({ name: normalizedName });

    console.log("Existing:", existing);

    // 3️⃣ BUY
    if (normalizedMode === "BUY") {
      if (existing) {
        const newQty = existing.qty + buyQty;

        const newAvg =
          (existing.avg * existing.qty + buyPrice * buyQty) / newQty;

        existing.qty = newQty;
        existing.avg = newAvg;

        await existing.save();
        console.log("UPDATED HOLDING");
      } else {
        await HoldingModel.create({
          product: "CNC",
          name: normalizedName,
          qty: buyQty,
          avg: buyPrice,
          price: buyPrice,
          net: "0%",
          day: "0%",
          isLoss: false,
        });

        console.log("NEW HOLDING CREATED");
      }
    }

    // 4️⃣ SELL
    else if (normalizedMode === "SELL") {
      if (!existing || existing.qty < buyQty) {
        return res.status(400).send("Not enough stock");
      }

      existing.qty -= buyQty;

      if (existing.qty === 0) {
        await HoldingModel.deleteOne({ name: normalizedName });
      } else {
        await existing.save();
      }
    }

    res.json({ success: true });
  } catch (err) {
    console.error("ERROR:", err);
    res.status(500).send("Server error");
  }
});

app.get("/allOrders", async (req, res) => {
  try {
    const orders = await OrderModel.find();
    res.json(orders);
  } catch (err) {
    res.status(500).send("Error fetching orders");
  }
});

app.listen(PORT, () => {
  console.log("server running at port", 3002);
});
