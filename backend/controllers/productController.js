import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'

// @route    GET api/products
// @desc     Fetch all products
// @access   Public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.json(products)
})

// @route    GET api/products/:id
// @desc     Fetch a product
// @access   Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

export { getProducts, getProductById }