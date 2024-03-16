import { randomUUID } from 'crypto'
import { neededValue } from '../../utils/neededValue.js'

export class Ticket {
    #amount
    #purchaser
    constructor({ id, code, purchase_datetime, amount, purchaser }) {
        this.id = randomUUID()
        this.code = randomUUID()
        this.purchase_datetime = new Date().toLocaleDateString
        this.amount = neededValue(amount, 'monto total')
        this.purchaser = neededValue(purchaser, 'comprador')
    }

    get amount() {
        return this.#amount
    }

    set amount(totalAmount) {
        this.#amount = totalAmount
    }

    get purchaser() {
        return this.#purchaser
    }

    set purchaser(email) {
        if (!isNaN(email)) throw new Error('el email del comprador debe ser un texto')
        this.#purchaser = email
    }

    toPojo() {
        return {
            id: this.id,
            code: this.code,
            date: this.purchase_datetime,
            amount: this.amount,
            purchaser: this.purchaser
        }
    }
}


