import * as fs from 'node:fs'
import  path, { dirname }  from 'path'
import { fileURLToPath } from 'url'
import cors from 'cors'
import 'dotenv/config'
import express from 'express'
// import fileUpload from 'express-fileupload'
// import multer from 'multer'
import nodemailer from 'nodemailer'
import sqlite3 from 'sqlite3'
import catalogMock from '../store/mock.ts'




// подключение к БД
const SQLite3 = sqlite3.verbose()
const db = new SQLite3.Database('grannyLida.db', (err) => {
  if (err) {
    console.error(err.message)
    return
  }
  console.log('Connected to the database.')
})

// // метод обертка для работы с БД
// const query = (method = 'all', command: string) => {
//   return new Promise((resolve, reject) => {
//     (db as any)[method](command, (error: string, result: string) => {
//       if (error) {
//         reject(error)
//       } else {
//         resolve(result)
//       }
//     })
//   })
// }

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(fileUpload({
//   limits: { fileSize: 10 * 1024 * 1024 } // 10 Мб
// }))

const PORT = process.env.PORT

// Получаем путь до папки с картинками
const  __dirname = dirname(fileURLToPath(import.meta.url))
const baseDir = path.resolve(__dirname + '/../..')

// метод проверяет пользователя на вход
app.post('/api/checkAuth', (req, res) => {

  // db.serialize(async () => {
  //   await db.run('create table if not exists users (id integer primary key, login text, pass text, role text)', (err) => {
  //     if (err) {
  //       console.error(err.message)
  //       return
  //     }
  //     console.log('Table is created')
  //   })
  // })

  // db.serialize(async () => {
  //   await db.run('insert into users values (0, "admin", "admin", "admin")', (err) => {
  //     if (err) {
  //       console.error(err.message)
  //       return
  //     }
  //     console.log('Row is inserted')
  //   })
  // })

  db.serialize(async () => {
    await db.get(`select * from users where login = "${req.body.login}" and pass = "${req.body.pass}"`, (err, row) => {
      if (err) {
        res.status(500).json(err.message)
        return
      }
      if (row){
        res.status(200).json(`user is exists`)
      } else {
        res.status(500).json(`user is not exists`)
      }
    })
  })
 
  
})

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

  const transporter = nodemailer.createTransport({ // создаем настройки сервера отправки писем
    host: 'smtp.yandex.ru',
    port: 465,
    secure: true,
    auth: {
      user: process.env.USERMAIL, // логин и пароль берем из файла env
      pass: process.env.PASSMAIL,
    },
  })

  const mailOptions = {  // создаем настройки самого письма
    from: 'broke1@yandex.ru', // откуда оптравляем
    to: 'broke1@yandex.ru', // кому отправляем
    subject: 'CrannyLida Заказ', // Тема письма
    // текст письма
    html: `<div style="font-size: 20px;"> 
      <p><b>Имя</b>:    ${req.body.name}</p>
      <p><b>Телефон</b>:    ${req.body.phone}</p>
      <p><b>Комментарий</b>:    ${req.body.comments}</p>
    </div>`
  }

  transporter.sendMail(mailOptions, function (err, data) { // метод отправки письма
    if (err) {
      res.status(500).json(err) // если ошибка возвращаем её с кодом 500
      console.log(`Error ${err}`)
    } else {
      res.status(200).json(data) // если все успешно с кодом 200
      console.log('Email sent successfully')
    }
  })

  
})

// настройка для загружаемых файлов
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(baseDir, '/public')) // Путь, куда сохранять файл
//   },
//   filename: (req, file, cb) => {
//     cb(null, path.extname(file.originalname)) // Переименование файла
//   }
// })

// const upload = multer({ storage: storage })

// const upload = multer({
//   dest: '/public',
//   limits: { 
//     fileSize: 50 * 1024 * 1024 
//   }
// })


// метод отправки новой карточки товара
app.post('/api/addCard',  (req, res) => {

  console.log('sadasdsadsad', req.body)

  // if (!req.file || Object.keys(req.file).length == 0) {
  //   return res.status(400).send('Нет файлов для загрузки.')
  // }

  // upload.single('images')(req, res, (err) => {
  //   if (err) {
  //     console.log(err.code)
  //     // if (err.code === 'LIMIT_FILE_SIZE') {
  //     //     return res.status(400).send('Файл слишком большой. Максимальный размер: 5 МБ.');
  //     // }
  //     // return res.status(500).send('Произошла ошибка при загрузке файла.');
  //   }
  // })

  

  // upload.single('images')
  

  

  // console.log('sdfsdfsdf')

  

  // const files = req.files.images

  

  // if (!Array.isArray(files)) {
  //   console.log(files.size)
  //   console.log(files.name)
  //   files.mv(path.join(baseDir, '/public/Catalog', files.name))
  // }
  //   files.map(file => {
  //     const filePath = path.join(uploadDir, Date.now() + '_' + file.name);
  //     return new Promise((resolve, reject) => {
  //         file.mv(filePath, (err) => {
  //             if (err) {
  //                 reject(err);
  //             } else {
  //                 resolve(filePath);
  //             }
  //         });
  //     });
  // });

  res.status(200).json('success')
  
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

// закрываем соединение с БД
// db.close((err) => {
//   if (err) {
//     console.error(err.message)
//     return;
//   }
//   console.log('Connection closed.')
// })