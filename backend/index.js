require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("./model/UserModel");
const { HoldingModel } = require("./model/HoldingModel");
const { PositionModel } = require("./model/PositionModel");
const { OrderModel } = require("./model/OrderModel");

const app = express();
const PORT = process.env.PORT || 3002;

// 🔥 MIDDLEWARES
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: "https://investo-ecr9.vercel.app", // your frontend
  credentials: true
}));

// 🔥 CONNECT DB
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// 🔥 JWT TOKEN
const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_KEY, {
    expiresIn: "3d",
  });
};

// ================= AUTH =================

// SIGNUP
app.post("/signup", async (req, res) => {
  try {
    const email = req.body.email.trim().toLowerCase();
    const password = req.body.password;
    const username = req.body.username;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.json({ success: false, message: "User already exists" });
    }

    const user = await User.create({ email, password, username });
    const token = createToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None"
    });

    res.json({ success: true });

  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// LOGIN
app.post("/login", async (req, res) => {
  try {
    const email = req.body.email.trim().toLowerCase();
    const password = req.body.password;

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({ success: false, message: "Wrong password" });
    }

    const token = createToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None"
    });

    res.json({ success: true, message: "Login successful" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ================= DATA =================

// HOLDINGS
app.get("/allHoldings", async (req, res) => {
  const data = await HoldingModel.find();
  res.json(data);
});

// POSITIONS
app.get("/allPositions", async (req, res) => {
  const data = await PositionModel.find();
  res.json(data);
});

// ORDERS
app.get("/allOrders", async (req, res) => {
  try {
    const orders = await OrderModel.find();
    res.json(orders);
  } catch {
    res.status(500).send("Error fetching orders");
  }
});

// NEW ORDER
app.post("/newOrder", async (req, res) => {
  try {
    let { name, qty, price, mode } = req.body;

    const buyQty = Number(qty);
    const buyPrice = Number(price);
    const normalizedName = name.trim().toUpperCase();
    const normalizedMode = mode.toUpperCase();

    await OrderModel.create({
      name: normalizedName,
      qty: buyQty,
      price: buyPrice,
      mode: normalizedMode,
    });

    let existing = await HoldingModel.findOne({ name: normalizedName });

    if (normalizedMode === "BUY") {
      if (existing) {
        const newQty = existing.qty + buyQty;
        const newAvg =
          (existing.avg * existing.qty + buyPrice * buyQty) / newQty;

        existing.qty = newQty;
        existing.avg = newAvg;
        await existing.save();
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
      }
    } else if (normalizedMode === "SELL") {
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
    console.error(err);
    res.status(500).send("Server error");
  }
});

// ================= SERVER =================

app.listen(PORT, () => {
  console.log("Server running at port", PORT);
});
