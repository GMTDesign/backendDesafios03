import cookieParser from "cookie-parser"
import { COOKIE_KEY } from "../config/config.js"

export const cookies = cookieParser(COOKIE_KEY)