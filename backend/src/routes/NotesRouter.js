const express = require("express");
const router = express.Router();

// temporary route
router.get("/", (req, res) => {
    res.send("Notes working");
});

module.exports = router;