const express = require("express");
const router = express.Router();
const Orders = require("../Models/order");
const { v4: uuid } = require("uuid");


router.post("/addOrder", async (req, res) => {
  const { Customer_name,  Delivery_Date, Order_Number, Priority, Item, Task, Assigned, Remark } = req.body;

  try {
  
      const lastOrder = await Orders.findOne().sort({ Order_Number: -1 });

      
      const newOrderNumber = lastOrder ? lastOrder.Order_Number + 1 : 1;

      const newOrder = new Orders({
          Customer_name,
          Order_Number: newOrderNumber,
          Delivery_Date,
          Priority,
          Item,
          Task,
          Assigned,
          Remark,
          Order_uuid: uuid()
      });

      await newOrder.save();
      res.json({ success: true, message: "Order added successfully" });
  } catch (error) {
      console.error("Error saving order:", error);
      res.status(500).json({ success: false, message: "Failed to add order" });
  }
});



  router.get("/GetOrderList", async (req, res) => {
    try {
      let data = await Orders.find({});
  
      if (data.length)
        res.json({ success: true, result: data.filter((a) => a.Customer_name) });
      else res.json({ success: false, message: "Order Not found" });
    } catch (err) {
      console.error("Error fetching users:", err);
        res.status(500).json({ success: false, message: err });
    }
  });

  router.get("/:id", async(req, res) => {
    const orderId = req.params.id;

    try {
      const order = await Orders.findById(orderId);

      if (!order) {
          return res.status(404).send({ success: false, message: "Order not found" });
      }

      return res.send({ success: true, result: order });
  } catch (err) {
      console.error("Error retrieving order:", err);
      return res.status(500).send({ success: false, message: "Internal Server Error" });
  }
});

router.put("/updateOrder/:id", async (req, res) => {
  try {
      const { Delivery_Date, ...otherFields } = req.body;

      const [day, month, year] = Delivery_Date.split('-');
      const isoDate = `${year}-${month}-${day}`;

      const updatedOrder = await Orders.findOneAndUpdate(
          { _id: req.params.id },
          { $set: { Delivery_Date: isoDate, ...otherFields } },
          { new: true }
      );

      if (!updatedOrder) {
          return res.status(404).json({ success: false, message: "Order not found" });
      }

      res.json({ success: true, result: updatedOrder });
  } catch (err) {
      console.error('Update error:', err);
      res.status(500).json({ success: false, message: err.message });
  }
});



  module.exports = router;