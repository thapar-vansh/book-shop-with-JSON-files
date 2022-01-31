import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express()

import db from './util/database.js'
import adminRoutes from './routes/admin.js'
import shopRoutes from './routes/shop.js'
import errController from './controllers/products.js'
import products from './controllers/products.js'


app.use(cors({
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'origin': '*',
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
}))

app.use(express.static('public'))  

app.set('view engine', 'ejs')
app.set('views', 'views')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.resolve('public')))

app.use('/admin', adminRoutes)
app.use(shopRoutes)
app.use(errController.get404)

app.listen(3000)