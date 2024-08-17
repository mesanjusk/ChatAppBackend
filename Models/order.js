const mongoose = require('mongoose');

const OrdersSchema=new mongoose.Schema({
    Order_uuid: { type: String },
    Order_Number: { type: Number, required: true, unique: true },
    Customer_name: { type: String, required: true },
    Delivery_Date: { type: Date, required: true },
    Priority: { type: String, required: true },
    Item: { type: String, required: true },
    Task: { type: String, required: true },
    Assigned: { type: String, required: true },
    Remark: { type: String, required: true },
 },  { timestamps: true })

 const Orders = mongoose.model("Orders", OrdersSchema);

module.exports = Orders;