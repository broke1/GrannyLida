import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import catalogMock from '../store/mock.ts'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const PORT = process.env.PORT

app.get('/api/getCatalogList', (_req, res) => {
  res.status(200).json(catalogMock)
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})