const { model } = require("mongoose");
const { OrdersSchema } = require("../schemas/OrderSchema.js");

const OrderModel = model("order", OrdersSchema); // ✅ no 'new'

module.exports = { OrderModel };