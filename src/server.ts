import express from "express"
import colors from "colors"
import morgan from "morgan"
import cors, {CorsOptions} from "cors"
import swaggerUi from "swagger-ui-express"
import { swaggerUiOptions } from "./config/swagger"
import swaggerSpec from "./config/swagger"
import routerProducts from "./router"
import db from "./config/db"


export async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        //console.log(colors.blue("Successful connection"))
    } catch (error) {
        //console.log(error)
        console.log(colors.red.bold("There was an error connecting to the database..."))
    }
}

connectDB()

// Instance Express
export const server = express()

// Allow Connections
const corsOptions : CorsOptions = {
    origin: function(origin, callback) {
        if(origin === process.env.FRONTEND_URL){
            callback(null, true)
        }else{
            callback(new Error('Error de CORS'))
        }
    }
}  
server.use(cors(corsOptions))

// Read data from forms
server.use(express.json())

server.use(morgan('dev'))
server.use('/api/products', routerProducts)

//docs 
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions))

export default server