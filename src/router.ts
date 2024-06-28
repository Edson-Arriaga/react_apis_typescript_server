import { Router } from "express"
import { body, param } from "express-validator"
import { createProduct, deleteProduct, getProduct, getProductById, updateAvailability, updateProduct } from "./handlers/product"
import { handleInputErrors } from "./middleware"

const routerProducts = Router()

/**
 * @swagger
 * components:
 *      schemas:
 *          Product:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: The Product ID
 *                      example: 1
 *                  name: 
 *                      type: string
 *                      description: The Product name
 *                      example: Blue headphones
 *                  price: 
 *                      type: number
 *                      description: The Product price
 *                      example: 300
 *                  availability: 
 *                      type: boolean
 *                      description: The Product availability
 *                      example: true
 */

/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: Get a list of products
 *          tags:
 *              - Products
 *          description: Return a list of products.
 *          responses: 
 *              200:
 *                  description: Succesful response.
 *                  content: 
 *                      applicaction/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Product' 
 */
routerProducts.get('/', getProduct)

/**
 * @swagger
 * /api/products/{id}:
 *      get:
 *          summary: Get a product by ID
 *          tags:
 *              - Products
 *          description: Return a product based on its unique ID.
 *          parameters: 
 *            - in: path
 *              name: id
 *              description: The ID of the product to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200: 
 *                  description: Succesful Response.
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product' 
 *              404: 
 *                  description: Not found.
 *              400: 
 *                  description: Bad Request - Invalid ID     
 */

routerProducts.get('/:id', 
    param('id').isInt().withMessage('ID invalid'),
    handleInputErrors,
    getProductById
)

 /**
 *  @swagger
 * /api/products:
 *      post:
 *          summary: Create a new product.
 *          tags: 
 *              - Products
 *          description: Return a new record in the database.
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name: 
 *                                  type: string
 *                                  example: Blue Headphones
 *                              price:
 *                                  type: number
 *                                  example: 399
 *          responses:
 *              201  :
 *                  description: Succesful response
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product' 
 *              400:
 *                  description: Bad Request - Invalid input data
 */

routerProducts.post('/',
    body('name').notEmpty().withMessage('The name can\'t be empty'),
    body('price')
            .isNumeric().withMessage('Number not valid')
            .notEmpty().withMessage('The price can\'t be empty')
            .custom(value => value > 0).withMessage('The price must be greater than 0'),
    handleInputErrors,
    createProduct
)

/**
 * @swagger
 * /api/products/{id}:
 *      put:
 *          summary: Update a product with user input.
 *          tags:
 *              - Products
 *          description: Return the updated product.
 *          parameters: 
 *            - in: path
 *              name: id
 *              description: The ID of the product to retrieve.
 *              required: true
 *              schema:
 *                  type: integer
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name: 
 *                                  type: string
 *                                  example: Blue Headphones
 *                              price:
 *                                  type: number
 *                                  example: 399
 *                              avaliability:
 *                                  type: boolean
 *                                  example: true
 * 
 *          responses: 
 *              200:
 *                  description: Succesful response
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product' 
 *              400:
 *                  description: Bad Request.
 *              404:
 *                  description: Product not found.
 */

routerProducts.put('/:id',
    param('id').isInt().withMessage('Invalid ID'),
    body('name').notEmpty().withMessage('The name can\'t be empty'),
    body('price')
            .isNumeric().withMessage('Number not valid')
            .notEmpty().withMessage('The price can\'t be empty')
            .custom(value => value > 0).withMessage('The price must be greater than 0'),
    body('availability')
            .isBoolean().withMessage('Value for availability not valid'),
    handleInputErrors,
    updateProduct
)

/**
 * @swagger
 * /api/products/{id}:
 *      patch:
 *          summary: Update Product availability
 *          tags: 
 *              - Products
 *          descriprion: Returns the updated availability.
 *          parameters: 
 *            - in: path
 *              name: id
 *              description: The ID of the product to retrieve.
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Succesful response
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product' 
 *              400:
 *                  description: Bad Request.
 *              404:
 *                  description: Product not found.
 */

routerProducts.patch('/:id', 
    param('id').isInt().withMessage('Invalid ID'),
    handleInputErrors,   
    updateAvailability
)

/**
 * @swagger
 * /api/products/{id}:
 *      delete:
 *          summary: Delete a product.
 *          tags:
 *              - Products
 *          description: Return a confirmation message.
 *          parameters: 
 *            - in: path
 *              name: id
 *              description: The ID of the product to delete.
 *              required: true
 *              schema:
 *                  type: integer
 *          responses: 
 *              200:
 *                  description: Succesful response
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              type: string
 *                              value: Product deleted
 *              400:
 *                  description: Bad Request.
 *              404:
 *                  description: Product not found.
 *          
 */

routerProducts.delete('/:id', 
    param('id').isInt().withMessage('Invalid ID'),
    handleInputErrors,  
    deleteProduct
)

export default routerProducts