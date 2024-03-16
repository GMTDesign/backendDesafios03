import { Ticket } from "../models/validationModels/Ticket"
import { cartsService } from "./carts.service"
import { productsService } from "./products.service"

class TicketsService {

    async postTicket(cid, email) {
        const searchedCart = await cartsService.getCart(cid)
        //instancio el ticket
            searchedCart.products.forEach(prod => {
                const searchedProd = productsService.getProduct(prod._id)
                if (searchedProd.quantity >= prod.quantity) {
                    //acumulo los importes en el amount de ticket y elimino el producto del carrito

                }
            })

    }
}

export const ticketsService = new TicketsService()