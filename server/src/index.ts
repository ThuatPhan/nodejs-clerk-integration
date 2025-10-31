import express from 'express'
import dotenv from 'dotenv'
import { serve } from 'inngest/express'
import { functions, inngest } from './lib/inngest'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.use('/api/inngest', serve({ client: inngest, functions }))

app.get('/', async (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
