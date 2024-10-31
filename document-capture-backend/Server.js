const express = require('express');
const cors = require('cors');
const multer = require('multer');
const Tesseract = require('tesseract.js');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post('/extract', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  Tesseract.recognize(
    req.file.buffer,
    'eng',
    {
      logger: info => console.log(info) // Log progress
    }
  ).then(({ data: { text } }) => {
    console.log("Extracted text:", text); // Log the extracted text

    const name = extractName(text);
    const documentNumber = extractDocumentNumber(text);
    const expirationDate = extractExpirationDate(text);
    res.json({
      name,
      document_number: documentNumber,
      expiration_date: expirationDate
    });
  }).catch(err => {
    console.error(err);
    res.status(500).json({ error: 'Error during OCR processing' });
  });
});

function extractName(text) {
  const lines = text.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (/DOB|Date of Birth|Your Aadhaar No.|Male|Female|Sex/.test(lines[i])) {
      if (i > 0) {
        const possibleName = lines[i - 1].trim();
        if (!/^(DOB|Date|Birth|Male|Female|Sex|Government|India|Your Aadhaar No)$/.test(possibleName) && /^[A-Za-z\s]+$/.test(possibleName)) {
          return possibleName;
        }
      }
    }
  }
  return "Not found";
}

function extractDocumentNumber(text) {
  const docNumMatch = text.match(/Your Aadhaar No.\s*:\s*([0-9\s]+)/i);
  return docNumMatch ? docNumMatch[1].replace(/\s+/g, '') : "Not found"; // Remove spaces for a clean number
}

function extractExpirationDate(text) {
  const expDateMatch = text.match(/DOB\s*[:\s]*([0-9\/-]+)/i);
  return expDateMatch ? expDateMatch[1].trim() : "Not found";
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
