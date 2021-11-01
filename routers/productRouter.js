const router = require('express').Router();

const {
  managerUploadProduct,
  managerGetAllProduct,
  managerUpdateProduct,
  managerdeleteProduct,
} = require('../controllers/productController');

// manager upload products
router.post('/upload/:phone', managerUploadProduct);

// manager get all products
router.get('/get/all/:phone', managerGetAllProduct);

// manager update products
router.put('/update/:id', managerUpdateProduct);

// manager delete product
router.delete('/delete/:id', managerdeleteProduct);

module.exports = router;
