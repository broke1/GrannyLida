import * as fs from 'node:fs'
import  path, { dirname }  from 'path'
import { fileURLToPath } from 'url'
import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import catalogMock from '../store/mock.ts'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const PORT = process.env.PORT

// Получаем путь до папки с картинками
const  __dirname = dirname(fileURLToPath(import.meta.url))
const baseDir = path.resolve(__dirname + '/../..')

// метод возвращает каталог тортов
app.get('/api/getCatalogList', (_req, res) => {

  // получив данные пробегаемся по ним
  catalogMock.forEach( item => {
    // очищаем галерею
    item.gallery = [] 
    // считываем каталог на наличие в нем всех файлов и пробегаемся по ним
    fs.readdirSync(path.join(baseDir, '/public', item.imgPath)).forEach(file => {
      // если это не главная картинка, она нам для галереи не нужна
      if (!file.includes('main')){
        // добавляем в галерею путь файла
        item.gallery.push(file)
      }
    })
    // сортируем галерею
    item.gallery.sort((a, b) => a > b ? 1 : -1 )
  })
  // возвращаем обнволенный каталог с галерей
  res.status(200).json(catalogMock)
})

// метод отправки данных на почту
app.post('/api/sendOrder', (req, res) => {

  res.status(200).json(req.body)
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})