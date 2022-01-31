import path from 'path'
import fs from 'fs'
import Cart from './cart.js'

const getProductsFromFile = (cb) => {
  const p = path.resolve('data/products.json')
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      return cb([])
    } else {
      cb(JSON.parse(fileContent))
    }
  })
}

class Product {
  constructor(id, title, imageUrl, price, description) {
    this.id = id
    this.title = title
    this.imageUrl = imageUrl
    this.price = price
    this.description = description
  }

  save() {
    const p = path.resolve('data/products.json')
    getProductsFromFile((products) => {
      if (this.id) {
        const existingProductIndex = products.findIndex(
          (prod) => prod.id === this.id
        )
        const updatedProducts = [...products]
        updatedProducts[existingProductIndex] = this
        fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
          console.log(err)
        })
      } else {
        this.id = Math.random().toString()
        products.push(this)
        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log(err)
        })
      }
    })
  }

  static deleteById(id) {
    const p = path.resolve('data/products.json')
    getProductsFromFile((products) => {
      const product = products.find((prod) => prod.id === id)
      const updatedProducts = products.filter((prod) => prod.id !== id)
      fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
        if (!err) {
          Cart.deleteProduct(id, product.price)
        }
      })
    })
  }

  static fetchAll(cb) {
    getProductsFromFile(cb)
  }

  static findById(id, cb) {
    getProductsFromFile((products) => {
      const product = products.find((p) => p.id === id)
      cb(product)
    })
  }
}

export default Product
