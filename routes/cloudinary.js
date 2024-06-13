const express = require('express');
const upload = require('../middleware/multer'); // Adjust the path if necessary

const router = express.Router();

router.post('/upload', (req, res) => {
  upload.single('pic')(req, res, (err) => {
    if (err) {
      console.error('Error during file upload:', err);
      return res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
    if (req.file) {
      console.log('Uploaded file:', JSON.stringify(req.file, null, 2));
      res.status(200).json({
        message: 'File uploaded successfully',
        fileUrl: req.file.path,
      });
    } else {
      console.error('File upload failed');
      res.status(400).json({ message: 'File upload failed' });
    }
  });
});

module.exports = router;
