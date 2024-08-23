const express = require('express');
const productController = require('../controllers/controller');

const router = express.Router();

router.get('/', productController.getAllProducts);
router.get('/:code', productController.getProductByCode);
router.put('/:code', productController.updateProductByCode);
router.delete('/:code', productController.deleteProductByCode);

module.exports = router;
