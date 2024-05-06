import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { createServer } from 'http'
import { Server } from 'socket.io'

const app = express()
const httpServer = createServer(app)
const PORT = process.env.PORT | 3000

app.use(
	cors({
		origin: 'http://localhost:5173',
	}),
)

app.use(morgan('tiny'))
const io = new Server(httpServer, {
	cors: {
		origin: 'http://localhost:5173',
	},
})

io.on('connect', socket => {
	console.log('New user connected')

	socket.on(
		'sendMessage',
		({ user, text }) => io.emit('message', text), // Broadcast the message to all connected clients
	)

	socket.on('disconnect', () => console.log('User disconnected'))
})

httpServer.listen(PORT, () => console.log(`Running on port: ${PORT}`))
