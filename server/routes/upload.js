const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const router = express.Router();
const { upload, resizeImage, isLogged } = require('../middleware');

router.post('/', isLogged, upload.array('image', 5), resizeImage);
router.delete('/:imgName', async (req, res, next) => {
  const { imgName } = req.params;
  const imgPath = path.join(__dirname, '..', 'uploads', imgName);
  try {
    await fs.unlink(imgPath);
    res.status(200).json({
      message: `Delete image: ${imgName}`,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
