import { randomUUID } from 'crypto'
import { neededValue } from '../../utils/neededValue.js'

export class Product {
    #title
    #description
    #code
    #price
    #stock
    #category
    
    constructor({ id, title, description, code, price, status = true, stock, category, thumbnails }) {
        this.id = randomUUID()
        this.title = neededValue(title, 'título')
        this.description = neededValue(description, 'descripción')
        this.code = neededValue(code, 'código')
        this.price = neededValue(price, 'precio')
        this.status = status
        this.stock = stock ?? 0
        this.category = neededValue(category, 'categoría')
        this.thumbnails = thumbnails ?? []
    }

    get title() {
        return this.#title
    }

    set title(newTitle) {
        if (!isNaN(newTitle)) throw new Error('el título debe ser un texto')
        this.#title = newTitle
    }

    get description() {
        return this.#description
    }

    set description(newDescription) {
        if (!isNaN(newDescription)) throw new Error('la descripción debe ser un texto')
        this.#description = newDescription
    }

    get code() {
        return this.#code
    }

    set code(newCode) {
        if (!isNaN(newCode)) throw new Error('el código de producto debe ser un texto')
        this.#code = newCode
    }

    get price() {
        return this.#price
    }

    set price(newPrice) {
        if (newPrice <= 0 || isNaN(newPrice)) throw new Error('el precio debe ser un número mayor a 0')
        this.#price = newPrice
    }

    get stock() {
        return this.#stock
    }

    set stock(newStock) {
        if (newStock < 0 || isNaN(newStock)) throw Error('el stock debe ser un número y no puede ser negativo')
        this.#stock = newStock
    }

    get category() {
        return this.#category
    }

    set category(newCategory) {
        if (!isNaN(newCategory)) throw new Error('la categoría debe ser un texto')
        this.#category = newCategory
    }

    toPojo() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            code: this.code,
            price: this.price,
            status: this.status,
            stock: this.stock,
            category: this.category,
            thumbnails: this.thumbnails
        }
    }
}


