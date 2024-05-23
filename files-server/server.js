const express = require('express');
const multer  = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// Set up multer for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './user-uploads/') // Specify the directory where uploaded files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname) // Use the original filename for the uploaded file
  }
});

const upload = multer({ storage: storage });

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Handle POST requests to '/upload' for file upload
app.post('/upload', upload.single('file'), (req, res) => {
  res.sendStatus(200); // Send a success response
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
