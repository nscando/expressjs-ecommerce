const express = require('express');
const router = express.Router();
const ProductsService = require('../../services/products');

const productsService = new ProductsService();

router.get('/', async function (req, res, next) {
  const { tags } = req.query;

  try {
    const products = await productsService.getProducts({ tags })

    res.status(200).json({
      data: products,
      message: 'products listed'
    })
  } catch (err) {
    next(err);
  }

});


router.get('/:productId', async function (req, res, next) {
  const { productId } = req.params;

  try {
    const product = await productsService.getProduct({ productId })

    res.status(200).json({
      data: product[0],
      message: 'product retrieved'
    })
  } catch (err) {
    next(err)
  }

});


router.post('/', async function (req, res, next) {
  const { body: product } = req;

  try {
    const createProduct = await productsService.createProduct({ product })

    res.status(201).json({
      data: createProduct[0],
      message: 'product created'
    })
  } catch (err) {
    next(err)
  }
});


router.put('/:productId', async function (req, res, next) {
  const { productId } = req.params;
  const { body: product } = req;

  try {
    const updateProduct = await productsService.updateProduct({ productId, product })

    res.status(200).json({
      data: updateProduct,
      message: 'product updated'
    })
  } catch (err) {
    next(err)
  }
});

router.delete('/:productId', async function (req, res, next) {
  const { productId } = req.params;

  try {
    const product = await productsService.deleteProduct({ productId })

    res.status(200).json({
      data: product,
      message: 'products deleted'
    })
  } catch (err) {
    next(err)
  }
});

router.patch('/:productId', async function (req, res, next) {
  const { productId } = req.params;
  const { body: editAttr } = req.params;

  try {
    const patchProduct = await productsService.updateProduct({ productId, editAttr })

    res.status(200).json({
      data: patchProduct,
      message: 'product patched'
    })
  } catch (err) {
    next(err)
  }
});


module.exports = router;