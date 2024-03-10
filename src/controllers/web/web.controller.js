import { productManager } from "../../models/mongooseModels/Product.js"
import { cartManager } from "../../models/mongooseModels/Cart.js"

export async function homeWebController (req, res) {

    const parameters = {}
    if (req.query.category) { parameters.category = req.query.category }
    if (req.query.status) { parameters.status = req.query.status}

    const paginateOptions = {
        limit: req.query.limit || 10,
        page: req.query.page || 1,
        lean: true
    }
    if (req.query.sort) { paginateOptions.sort = ({price: req.query.sort}) }
    const products = await productManager.paginate(parameters, paginateOptions)
    res.render('home.handlebars', {
        productsFlag: products.docs.length > 0,
        ...products,
    })

}

export async function cartWebController (req, res) {
    const cid = req.params.cid
    const searchedCart = await cartManager.find({_id: cid}, {'products._id': 0})
    const cartId = searchedCart[0]._id
    const cartProducts = searchedCart[0].products.map(product => {
        return {
            ...product.toJSON().product,
            quantity: product.quantity
        }
    })
    res.render('cart.handlebars', {
        cartId,
        cartProducts: {...cartProducts}
    })

}

export async function chatWebController (req, res) {
    res.render('chat.handlebars')
}

export async function registerWebController (req, res) {
    res.render('register.handlebars')
}

export async function loginWebController (req, res) {
    res.render('login.handlebars')
}

export async function profileWebController (req, res) {
    res.render('profile.handlebars')
}