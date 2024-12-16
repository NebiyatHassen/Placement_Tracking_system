const Form = require("../models/Survey");

exports.addRecord = async (req, res) => {
  try {
    const {
      fullName,
      phoneNumber,
      graduationYear,
      employmentStatus,
      company,
      position,
      sector,
      feedback,
    } = req.body;

    if (!fullName || !phoneNumber || !graduationYear || !employmentStatus) {
      return res.status(400).json({
        error:
          "fullName, phoneNumber, graduationYear, and employmentStatus are required.",
      });
    }

    if (employmentStatus === "Employed" && (!company || !position)) {
      return res.status(400).json({
        error: "Company and position are required for employed status.",
      });
    }

    if (employmentStatus === "Self-Employed" && !sector) {
      return res.status(400).json({
        error: "Sector is required for self-employed status.",
      });
    }
    if (employmentStatus === "Unemployed" && !feedback) {
      return res.status(400).json({
        error: "feedback is required for unemployed",
      });
    }
    const existingRecord = await Form.findOne({ phoneNumber });
    if (existingRecord) {
      return res.status(409).json({
        error: "Phone number already exists. Please use a unique phone number.",
      });
    }
    const newRecord = new Form(req.body);
    const savedRecord = await newRecord.save();

    res.status(201).json(savedRecord);
  } catch (error) {
    console.error("Error adding record:", error);
    res.status(500).json({ error: "Failed to add record." });
  }
};
exports.showRecord = async (req, res) => {
  try {
    const records = await Form.find();
    res.status(200).json(records);
  } catch (error) {
    console.error("Error fetching records:", error);
    res.status(500).json({ error: "Failed to fetch records." });
  }
};

exports.deleteRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRecord = await Form.findByIdAndDelete(id);

    if (!deletedRecord) {
      return res.status(404).json({ error: "Record not found." });
    }

    res
      .status(200)
      .json({ message: "Record deleted successfully.", deletedRecord });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete record." });
  }
};
