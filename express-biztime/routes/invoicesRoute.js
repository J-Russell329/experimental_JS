const express = require("express");
const router = new express.Router();



router.get("/", function(req, res) {
  return res.json({invoices:"invoices go here"});
});


module.exports = router;