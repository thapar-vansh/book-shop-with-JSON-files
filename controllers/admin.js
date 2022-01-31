import Product from '../models/product.js'

let getAddProduct = (req, res, next) => {
  res.render('admin/edit-product.ejs', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
  })
}

let postAddProduct = (req, res, next) => {
  const title = req.body.title
  const imageUrl = req.body.imageUrl
  const price = req.body.price
  const description = req.body.description
  const product = new Product(null, title, imageUrl, price, description)
  product.save()
  res.redirect('/')
}

let getEditProduct = (req, res, next) => {
  const editMode = req.query.edit
  if (!editMode) {
    return res.redirect('/')
  }
  const prodId = req.params.productId
  Product.findById(prodId, (product) => {
    if (!product) {
      res.redirect('/')
    }
    res.render('admin/edit-product.ejs', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product,
    })
  })
}

let postEditProduct = (req, res, next) => {
  const prodId = req.body.productId
  const updatedTitle = req.body.title
  const updatedImageUrl = req.body.imageUrl
  const updatedPrice = req.body.price
  const updatedDesc = req.body.description
  const updatedProduct = new Product(
    prodId,
    updatedTitle,
    updatedImageUrl,
    updatedPrice,
    updatedDesc
  )
  updatedProduct.save()
  res.redirect('/admin/products')
}

let getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('admin/products.ejs', {
      prods: products,
      pageTitle: 'Shop',
      path: '/admin/products.ejs',
    })
  })
}

let postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId
  Product.deleteById(prodId)
  res.redirect('/admin/products')
}

export default {
  postAddProduct: postAddProduct,
  getAddProduct: getAddProduct,
  getProducts: getProducts,
  getEditProduct: getEditProduct,
  postEditProduct: postEditProduct,
  postDeleteProduct: postDeleteProduct,
}
