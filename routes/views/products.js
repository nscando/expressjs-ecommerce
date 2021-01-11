const express = require('express');
const router = express.Router();
const ProductsService = require('../../services/products');
const { config } = require('../../config');

const cacheResponse = require('../../utils/cacheResponse');
const { FIVE_MIN_IN_SEC } = require('../../utils/time');

const productsService = new ProductsService();

router.get('/', async function (req, res, next) {
   cacheResponse(res, FIVE_MIN_IN_SEC);
   const { tags } = req.query;

   try {
      const products = await productsService.getProducts({ tags });
      res.render('products', { products, dev: config.dev })
   } catch (err) {
      next(err)
   }

})

module.exports = router;