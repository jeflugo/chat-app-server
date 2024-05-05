import 'dotenv/config'
import express from 'express'
import morgan from 'morgan'

const app = express()

const PORT = process.env.PORT | 3000

app.get('/', (req, res) => console.log('Home'))

app.use(morgan('tiny'))

app.listen(PORT, () => console.log(`Running on port: ${PORT}`))
