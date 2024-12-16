const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");
const {
  addRecord,
  deleteRecord,
  showRecord,
} = require("../controller/Surveyform");

router.post("/add", addRecord);

router.delete("/delete/:id", deleteRecord);
router.get("/show", authenticate, showRecord);

module.exports = router;
