import express from 'express'
import cors from 'cors'

import routes from '@chat/chat-routes.js'
import { config } from '@config/config.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/', routes)

app.get('/health', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }))

app.listen(config.port, () => console.log(`Chat API server running on port ${config.port}`))
