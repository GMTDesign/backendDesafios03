import fs from 'fs/promises'
import { Product } from '../../../models/Product.js'
import { randomUUID } from 'crypto'

export function neededValue(value, flag){
    if (value === null || value === undefined) throw new Error(`${flag} no puede ser null`)
    return value
}

export class ProductManager {
    #path
    #products
    constructor(path) {
        this.#path = path
        this.#products = []
    } 

    async addProduct(data) {
        await this.#readJSON()
        const existingCode = this.#products.find(prod => prod.code === data.code)
        if (existingCode) throw new Error ('código de producto existente')
        data.id = randomUUID()
        const product = new Product(data)
        this.#products.push(product.asPOJO())
        await fs.writeFile(this.#path, JSON.stringify(this.#products, null, 2))
        return product.asPOJO()
    }

    async getProducts(){
        await this.#readJSON()
        return this.#products

    }

    async getProductsWithLimit({ limit }){
        await this.#readJSON()
        return this.#products.slice(0, limit)
    }

    async getProductById(productId){
        await this.#readJSON()
        const searchProduct = this.#products.find(prod => prod.id === productId)
        if (!searchProduct) throw new Error(`producto con id ${productId} no encontrado`)
        return searchProduct
    }

    async updateProduct(productId, data){
        const index = await this.#readJSON(productId, data.code)
        // verifico que no se intente modificar el id del producto
        for (const propName of Object.keys(data)) {
            if (propName === "id") throw new Error('No puede modificar el id del producto')
        }
        const oldThumbnails = this.#products[index].thumbnails
        const updateProduct = {
            ...this.#products[index],
            ...data
        }
        const product = new Product(updateProduct)
        if (data.thumbnails) {
            product.thumbnails = [...oldThumbnails, ...data.thumbnails]
        }
        this.#products[index] = product.asPOJO()
        await fs.writeFile(this.#path, JSON.stringify(this.#products, null, 2))
        return this.#products[index]
    }

    async deleteProduct(productId){
        const index = await this.#readJSON(productId)
        this.#products.splice(index, 1)
        await fs.writeFile(this.#path, JSON.stringify(this.#products, null, 2))
        return this.#products[index]
    }

    async #readJSON (productId, code){
        this.#products = JSON.parse(await fs.readFile(this.#path, 'utf-8'))
        if (productId) {
            const index = this.#products.findIndex(prod => prod.id === productId)
            if (index === -1) throw new Error(`producto con id ${productId} no encontrado`)
            if (code) {
               const index2 = this.#products.findIndex(prod => prod.code === code)
                if (index2 !== -1) {
                    if (index !== index2 ) throw new Error('codigo perteneciente a otro producto')
                }
               
            }
            return index
        }
        
   }


}

export const productManager = new ProductManager('./db/products.json')