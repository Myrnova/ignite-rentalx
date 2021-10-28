import express, { Request, Response } from 'express'
import 'express-async-errors'
import swaggerUI from 'swagger-ui-express'

import { AppError } from '@shared/errors/AppError'

import swaggerFile from '../../../swagger.json'
import { router } from './routes'

import '../typeorm'
import '@shared/container'

const app = express()

app.use(express.json()) // to make app understand when the body is a json

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile))

app.use(router)

app.use((err: Error, request: Request, response: Response) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            message: err.message
        })
    }
    return response.status(500).json({
        status: 'error',
        message: `Internal server error - ${err.message}`
    })
})

app.listen(3333, () => console.log('Server is running!'))
