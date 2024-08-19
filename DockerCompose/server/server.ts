import * as fs from 'node:fs'
import  path, { dirname }  from 'path'
import { fileURLToPath } from 'url'
import bcrypt from 'bcrypt'
import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import multer from 'multer'
import nodemailer from 'nodemailer'
import sqlite3 from 'sqlite3'




// подключение к БД
const SQLite3 = sqlite3.verbose()
const db = new SQLite3.Database('grannyLida.db', (err) => {
  if (err) {
    console.error(err.message)
    return
  }
  console.log('Connected to the database.')
})

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
const baseDir = path.resolve(__dirname)

app.post('/api/checkAuth', (req, res) => {


  db.serialize(async () => {
    await db.get(`select * from users where login = "${req.body.login}"`, async (err, row) => {

      if (!row){
        res.status(500).json(`pass is not correct`)
        return
      }
      
      const isMatch = await bcrypt.compare(req.body.pass, (row as {pass: string}).pass)
      if (err) {
        res.status(500).json(err.message)
        return
      }
      if (isMatch){
        res.status(200).json(`pass is correct`)
      } else {
        res.status(500).json(`pass is not correct`)
      }
    })
  })
 
  
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

const copyFile = (originCatalog: string, newCatalog: string, imgName: string) => {

  const newCardPath = path.join(baseDir, process.env.VITE_BASEPATH as string, newCatalog)

  if (!fs.existsSync(newCardPath)){
    fs.mkdirSync(newCardPath)
  }

  fs.copyFile(
    path.join(baseDir, process.env.VITE_BASEPATH as string, originCatalog, imgName), 
    path.join(baseDir, process.env.VITE_BASEPATH as string, newCatalog, imgName), 
    (err) => {
    if (err) {
        return console.log('Ошибка при копировании файла!')
    }
  })

}

const deleteFolder = (originName: string) => {
 
  fs.rm(path.join(baseDir, process.env.VITE_BASEPATH as string, originName), { recursive: true, force: true }, (err) => {
    if (err) {
        console.log('Ошибка при удалении каталога!')
    }
  })
}

const storage = multer.diskStorage({ // делаем настройку для сохранения файлов с фронта
  destination: (req, _file, cb) => {

    const uploadPath = path.join(baseDir, process.env.VITE_BASEPATH as string, req.body.name) // путь куда сохраняем, он будет состоять из имени торта и картинок

    fs.mkdir(uploadPath, { recursive: true }, (err) => {
      if (err) {
        return cb(err,'')
      }
      cb(null, uploadPath) // путь картинки
    })
  },
  filename: (_req, file, cb) => {
    cb(null, file.originalname) // название картинки
  }
})

const upload = multer({ storage: storage }) // переменная для управления загрузкой файлов

// метод отправки новой карточки товара
app.post('/api/changeCard', upload.array('images', 15), (req, res) => {

  const checkvalue = (value: string) => value || ''

  const { id, name, originName, price, shortDescription, description, composition, protein, fats, carbo, calorie, images } = req.body

  let gallery = ''

  if ((req.files as Express.Multer.File[]).length > 0){   // если файлы выбраны пользователем
    gallery = (req.files as Express.Multer.File[]).map( item => {  // то пробегаемся по этим файлам
      return `${name}\\${item.originalname}` // и возвращаем корректное название
    }).join('; ')
  } else {
    if (typeof images == 'string'){ // если файл не выбран пользователем и он один
      gallery = `${name}\\${images.split('\\')[1]}` // добавляем этот один файл в галерею
      copyFile(originName,name,images.split('\\')[1]) // и копируем катинку этого файла в новую папку
    } else {
      gallery = images.map( (item: string) => { // если их несколько, то пробегаемся по ним
        copyFile(originName,name,item.split('\\')[1])  // и так же копируем
        return `${name}\\${item.split('\\')[1]}` // и добавляем все названия файлов
      }).join('; ')
    }
  }

   // удаляем исходные картинки, ибо поменялось название и папка
  deleteFolder(originName)

  let sql = ''

  if (id != '-1'){
    sql = `update catalog set name = "${name}", originName = "${name}", price = ${Number(checkvalue(price)) || 0}, shortDescription = "${checkvalue(shortDescription)}", description = "${checkvalue(description)}", 
    composition = "${checkvalue(composition)}", protein = "${checkvalue(protein)}", fats = "${checkvalue(fats)}", carbo = "${checkvalue(carbo)}", calorie = "${checkvalue(calorie)}", 
    gallery = "${checkvalue(gallery)}" where id = ${Number(id)}`
  } else {
    sql = `insert into catalog (name, originName, price, shortDescription, description, composition, protein, fats, carbo, calorie, gallery) 
      values ("${name}", "${name}", ${Number(checkvalue(price)) || 0}, "${checkvalue(shortDescription)}", "${checkvalue(description)}", "${checkvalue(composition)}",
      "${checkvalue(protein)}", "${checkvalue(fats)}", "${checkvalue(carbo)}", "${checkvalue(calorie)}", "${checkvalue(gallery)}")`
  }

  db.serialize(async () => {
    await db.run(sql, (err) => {
      if (err) {
        console.error(err.message)
        res.status(500).json(err.message)
        return
      }
      console.error('Row is insert successfully')
      res.status(200).json('success')
    })
  })
})

// метод получения всех товаров
app.get('/api/getCards', (_req, res) => {

  const sql = 'select * from catalog'

  db.serialize(async () => {
    await db.all(sql, (err, rows) => {
      if (err) {
        console.error(err.message)
        res.status(500).json(err.message)
        return
      }
      console.error('Rows is selected')
      res.status(200).json(rows)
    })
  })

  
})

// метод удаляет карточку товара
app.post('/api/deleteCards', (req, res) => {

  deleteFolder(req.body.name)

  db.serialize(async () => {
    await db.get(`delete from catalog where id = "${req.body.id}"`, (err) => {
      if (err) {
        res.status(500).json(err.message)
        return
      }
      console.log(`row is deleted`)
      res.status(200).json(`success`)
    })
  })
 
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})



// db.serialize(async () => {
//   await db.run(`create table if not exists catalog (id integer primary key  autoincrement, name text, price integer, shortDescription text, description text, 
//     composition text, protein text, fats text, carbo text, calorie text, gallery text)`, (err) => {
//     if (err) {
//       console.error(err.message)
//       return
//     }
//     console.log('Table is created')
//   })
// })

// db.serialize(async () => {
//   await db.run(`drop table catalog`, (err) => {
//     if (err) {
//       console.error(err.message)
//       return
//     }
//     console.log('Table is deleted')
//   })
// })

// db.serialize(async () => {
//   await db.run(`delete from catalog`, (err) => {
//     if (err) {
//       console.error(err.message)
//       return
//     }
//     console.log('Table is cleared')
//   })
// })
