import express from 'express'
import { router as domainRouter } from './controllers'

const app = express()

app.use(express.json())
app.use(domainRouter)

export default app
