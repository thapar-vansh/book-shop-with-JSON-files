import Product from '../models/product.js'
import Cart from '../models/cart.js'

let getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/product-list.ejs', {
      prods: products,
      pageTitle: 'All products',
      path: '/products',
    })
  })
}

let getProduct = (req, res, next) => {
  const prodId = req.params.productId
  Product.findById(prodId, (product) => {
    console.log(product)
    res.render('shop/product-detail.ejs', {
      product: product,
      pageTitle: product.title,
      path: '/products',
    })
  })
}

let getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/index.ejs', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
    })
  })
}

let getCart = (req, res, next) => {
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = []
      let product = req.body.productId
      for (product of products) {
        const cartProductData = cart.products.find(
          (prod) => prod.id === product.id
        )
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty})
        }
      }
      
      res.render('shop/cart.ejs', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: cartProducts,
        totalPrice: cart.totalPrice
      })
    })
  })
}

let postCart = (req, res, next) => {
  const prodId = req.body.productId
  Product.findById(prodId, (product) => {
    console.log(prodId)
    Cart.addProduct(prodId, product.price)
  })
  res.redirect('/cart')
}

let postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId
  Product.findById(prodId, (product) => {
    Cart.deleteProduct(prodId, product.price)
    res.redirect('/cart')
  })
}

let getOrders = (req, res, next) => {
  res.render('shop/orders.ejs', {
    path: '/orders',
    pageTitle: 'Your Orders',
  })
}

let getCheckout = (req, res, next) => {
  res.render('shop/checkout.ejs', {
    path: '/checkout',
    pageTitle: 'Checkout',
  })
}

export default {
  getIndex: getIndex,
  getProducts: getProducts,
  getCart: getCart,
  postCart: postCart,
  getCheckout: getCheckout,
  getOrders: getOrders,
  getProduct: getProduct,
  postCartDeleteProduct: postCartDeleteProduct,
}
