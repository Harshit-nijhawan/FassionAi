// controllers/orderController.js
const getOrders = async (req, res) => {
  res.json({ success: true, message: 'Orders route kaam kar raha hai!', orders: [] })
}

module.exports = { getOrders }