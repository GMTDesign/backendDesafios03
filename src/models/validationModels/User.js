import { randomUUID } from 'crypto'
import { neededValue } from '../../utils/neededValue.js'

export class User {
    #firstName
    #lastName
    #email
    #age
    #password
    #role

    constructor({ id, firstName, lastName, email, age, password, cart, role }) {
        this.id = randomUUID()
        this.firstName = neededValue(firstName, 'nombre')
        this.lastName = neededValue(lastName, 'apellido')
        this.email = neededValue(email, 'email')
        this.age = age ?? 0
        this.password = password
        this.cart = neededValue(cart, 'ID de carrito')
        this.role = role ?? 'user'
    }

    get firstName() {
        return this.#firstName
    }

    set firstName(newFirstName) {
        if (!isNaN(newFirstName)) throw new Error('el nombre debe ser un texto')
        this.#firstName = newFirstName
    }

    get lastName() {
        return this.#lastName
    }

    set lastName(newLastName) {
        if (!isNaN(newLastName)) throw new Error('el apellido debe ser un texto')
        this.#lastName = newLastName
    }

    get email() {
        return this.#email
    }

    set email(newEmail) {
        if (!isNaN(newEmail)) throw new Error('el email debe ser un texto')
        this.#email = newEmail
    }

    get age() {
        return this.#age
    }

    set age(newAge) {
        if (newAge < 0 || isNaN(newAge)) throw Error('la edad debe ser un número y no puede ser negativo')
        this.#age = newAge
    }

    get password() {
        return this.#password
    }

    set password(newPassword) {
        this.#password = newPassword
    }

    get role() {
        return this.#role
    }

    set role(newRole) {
        this.#role = newRole
    }

    toPojo() {
        return {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            age: this.age,
            password: this.password,
            cart: this.cart,
            role: this.role
        }
    }
}


