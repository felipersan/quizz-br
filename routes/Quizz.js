// rota de pessoa
const router = require('express').Router()
const Quizz = require('../models/Quizz')

//Criação da quizz
router.post('/', async (req, res) => {
  //extraindo informações do body
  const { type, questions, model, title, subtitle, results, photo } = req.body

  //fazendo o tratamento dos dados para mandar para o banco
  const quizz = {
    model,
    title,
    subtitle,
    questions,
    results,
    photo,
    type
  }

  //criando validações na API
  if (!model)
    res.status(422).json({ message: 'por favor escolha o tipo do quizz' })

  //criando dados com o mongoose
  try {
    //inserindo o json no banco de dados com a ajuda do método create do mongoose
    await Quizz.create(quizz)

    res.status(201).json({ message: 'quiz criado com sucesso', quizz: quizz })
  } catch (error) {
    res.status(500).json({
      message: error
    })
  }
})

// Listar todos os Quizzes
router.get('/', async (req, res) => {
  const { type } = req.query
  try {
    //Método usado para buscar pessoas no mongo com mongoose

    if (type) {
      const quizzesFilteredByType = await Quizz.find({ type: type })
      if (quizzesFilteredByType.length === 0)
        throw new Error('Não foram encontrados quizzes com essa categoria')
      res.status(200).json(quizzesFilteredByType)
    } else {
      const quizzes = await Quizz.find()
      res.status(200).json(quizzes)
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
})

//listar quizz por ID
router.get('/:id', async (req, res) => {
  //Método para pegar um filtro que o usuário enviou
  const id = req.params.id

  //Método para filtrar usuários por um parâmetro no banco de dados
  const personById = await Quizz.findOne({ _id: id })

  //tratamento de erro caso a pessoa não seja encontrada
  if (!personById) {
    res.status(422).json({
      message: 'Não encontramos esse quizz em nosso sistema'
    })
    return
  }

  res.status(200).json(personById)
})

//atualização de quizz
router.patch('/:id', async (req, res) => {
  //pegando o id
  const id = req.params.id

  //pegando as variáveis que vieram pelo body
  const { type, questions } = req.body

  //criando o nosso objeto de atualização
  const attQuizz = {
    type,
    questions
  }

  try {
    //atualizando no mongoDB
    const updatePerson = await Quizz.updateOne({ _id: id }, attQuizz)

    if (updatePerson.matchedCount === 0) {
      res.status(422).json({ message: 'Quizz não encontrado' })
      return
    }

    //dando a resposta à requisição
    res.status(200).json(attQuizz)
  } catch (error) {
    res.status(500).json({ message: error })
  }
})

//deleção de quizz
router.delete('/:id', async (req, res) => {
  //extraindo id
  const id = req.params.id

  //checando se o usuário existe
  const quizz = await Quizz.findOne({ _id: id })

  //validação caso o usuário não exista
  if (!quizz) {
    res.status(422).json({
      message: 'Não encontramos esse quizz, portanto não podemos deletá-la'
    })
    return
  }

  await quizz.deleteOne({ _id: id }).then(() => {
    res.status(200).json({ message: 'Quizz removido com sucesso' })
  })

  try {
  } catch (error) {
    res.status(500).json({ message: error })
  }
})

module.exports = router
