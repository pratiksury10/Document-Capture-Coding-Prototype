# Document-Capture-Coding-Prototype
Overview : The Document Capture Coding Prototype is a cutting-edge project designed to automatically extract key information from uploaded documents using Optical Character Recognition (OCR) technology. This prototype leverages Tesseract.js for OCR processing.

In this project the technologies used are
Node.js & Express : Backend server and API.
Tesseract.js : OCR processing.
React : Frontend interface.
Multer : Handling file uploads.
Cors : Enabling cross-origin requests.

Features:
OCR Processing : Converts images of documents into editable and searchable text.
Field Extraction : Extracts specific fields such as Name, Document Number and Expiration Date from the text.
File Upload : Supports uploading images directly through a user-friendly interface.
API Integration : Allows integration with other systems via a RESTful API.

API Endpoints :
Description : Extract information from the uploaded document.
Request : Multipart form-data with an image file.
Response : JSON containing extracted fields (name,document number, expiration date).
