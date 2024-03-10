import fs from 'fs/promises'
import { Cart } from '../models/Cart.js'
import { randomUUID } from 'crypto'

export class CartManager {
  #path
  #carts
  constructor(path) {
    this.#path = path
    this.#carts = []
  }

  async createCart() {
    this.#carts = JSON.parse(await fs.readFile(this.#path, 'utf-8'))
    const cart = new Cart({
      id: randomUUID()
    })
    this.#carts.push(cart)
    await fs.writeFile(this.#path, JSON.stringify(this.#carts, null, 2))
    return cart
  }

  async getCartById(cartId) {
    this.#carts = JSON.parse(await fs.readFile(this.#path, 'utf-8'))
    const searchCart = this.#carts.find(cart => cart.id === cartId)
    if (!searchCart) throw new Error(`carrito con ${cartId} no encontrado`)
    return searchCart
  }

  async addProduct(cartId, prodId) {
    this.#carts = JSON.parse(await fs.readFile(this.#path, 'utf-8'))
    const cartIndex = this.#carts.findIndex(cart => cart.id === cartId)
    if (cartIndex === - 1) throw new Error(`carrito con id ${cartId} no encontrado`)
    const prodIndex = this.#carts[cartIndex].products.findIndex(prod => prod.id === prodId)
    if (prodIndex !== -1) {
      this.#carts[cartIndex].products[prodIndex].quantity++
    } else {
      const newProduct = {
        id: prodId,
        quantity: 1
      }
      this.#carts[cartIndex].products.push(newProduct)
    }
    await fs.writeFile(this.#path, JSON.stringify(this.#carts, null, 2))
    return this.#carts[cartIndex]
  }
}

export const cartManager = new CartManager('./db/carts.json')