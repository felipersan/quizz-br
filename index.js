require('dotenv').config()
var cors = require('cors')

const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const app = express()

//permite que a minha API leia JSON
app.use(
  express.urlencoded({
    extended: true
  })
)
app.use(express.json())
app.use(morgan('dev'))

//disponibiliza o express em alguma porta, no caso a 3000
app.listen(3000)
app.use(cors())

//rotas de pessoa
const quizz = require('./routes/Quizz')

//rota de upload
const upload = require('./routes/Upload')

//redirecionando as rotas para o arquivo desejado
app.use('/quizz', quizz)
app.use('/upload', upload)

//conexão com o banco de dados
mongoose
  .connect(
    'mongodb+srv://felipersan:252627282930@cluster0.t7y3io0.mongodb.net/quizzi?retryWrites=true&w=majority'
  )
  .then(() => {
    app.listen(3001)
    console.log('conectamos ao mongo DB')
  })
  .catch(err => {
    console.log(
      'não foi possível conectar ao mongo DB pelo seguinte erro:' + err
    )
  })
