import { messagesService } from "../../services/messages.service.js"

export async function getController (req, res) {
    const messages = await messagesService.getMessages()
    if (!messages) {
        return res.status(400).json({ message: 'problemas al leer el archivo' })
    }
    res.json(messages)
}

export async function postController(req, res) {
    const {user, message } = req.body
    try {
        const newMessage = await messagesService.postMessage({user, message})
        res['refreshWeb']()
        res.json(newMessage)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}