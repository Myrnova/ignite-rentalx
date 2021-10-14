import express from 'express'

import { router } from './routes'

const app = express()

app.use(express.json()) // to make app understand when the body is a json

app.use(router)

app.listen(3333, () => console.log('Server is running!'))
