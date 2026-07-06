const fs = require("fs");
const pdfParse = require("pdf-parse");
const Resume = require("../models/resume");

module.exports=async (req, res) => {
  try {
    const pdfBuffer = fs.readFileSync(req.file.path);
    const data = await pdfParse(pdfBuffer);
    console.log(req.user)
    const resume = await Resume.create({
      userId: req.user.id,
      fileName: req.file.filename,
      filePath: req.file.path,
      extractedText: data.text
    });
    res.status(201).json(resume);

  } catch(error) {
    console.error(error); 
    res.status(500).json({
      message: error.message
    });
  }
};