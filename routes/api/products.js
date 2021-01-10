const express = require('express');
const passport = require('passport');
const router = express.Router();
const ProductsService = require('../../services/products');

const validation = require('../../utils/middlewares/validationHanlder')

const {
  productIdSchema,
  productTagSchema,
  updateProductSchema,
  createProductSchema
} = require('../../utils/schemas/products');

//JWT strategy
require('../../utils/auth/strategies/jwt');

const productsService = new ProductsService();

router.get('/', async function (req, res, next) {
  const { tags } = req.query;
  console.log('req', req.query);
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
  console.log('params', req.params);

  try {
    const product = await productsService.getProduct({ productId })

    res.status(200).json({
      data: product,
      message: 'product retrieved'
    })
  } catch (err) {
    next(err)
  }

});


router.post('/', validation(createProductSchema), async function (req, res, next) {
  const { body: product } = req;
  try {
    const createdProduct = await productsService.createProduct({ product });

    res.status(201).json({
      data: createdProduct,
      message: 'product created'
    });
  } catch (err) {
    next(err)
  }
});


router.put(
  '/:productId',
  passport.authenticate('jwt', { session: false }),
  validation({ productId: productIdSchema }, 'params'), validation(updateProductSchema),
  async function (req, res, next) {
    const { productId } = req.params;
    const { body: product } = req;

    try {
      const updatedProduct = await productsService.updateProduct({ productId, product })

      res.status(200).json({
        data: updatedProduct,
        message: 'product updated'
      })
    } catch (err) {
      next(err)
    }
  });

router.delete('/:productId',
  passport.authenticate('jwt', { session: false }),
  async function (req, res, next) {
    const { productId } = req.params;

    try {
      const deletedProduct = await productsService.deleteProduct({ productId })

      res.status(200).json({
        data: deletedProduct,
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
    const patchedProduct = await productsService.updateProduct({ productId, editAttr })

    res.status(200).json({
      data: patchedProduct,
      message: 'product patched'
    })
  } catch (err) {
    next(err)
  }
});


module.exports = router;