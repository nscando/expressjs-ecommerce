const express = require('express');
const router = express.Router();


router.get('/', function (req, res) {
     const { query } = req.query;
     res.status(200).json({
          data: porductsMock,
          message: 'products listed'

     })
});


router.get('/:productId', function (req, res) {
     const { productId } = req.params;
     res.status(200).json({
          data: porductsMock[0],
          message: 'products retrieved'

     })
});


router.post('/', function (req, res) {
     res.status(201).json({
          data: porductsMock[0],
          message: 'product created'

     })
});


router.put('/:productId', function (req, res) {

     res.status(200).json({
          data: porductsMock,
          message: 'products updated'

     })
});

router.delete('/:productId', function (req, res) {

     res.status(200).json({
          data: porductsMock[0],
          message: 'products deleted'

     })
});

module.exports = router