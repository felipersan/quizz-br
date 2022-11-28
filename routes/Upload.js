// rota de pessoa
const router = require('express').Router()
const multer = require('multer')
const multerConfig = require('../config/multer')

const Upload = require('../models/Upload')

//Criação da usuário
router.post('/', multer(multerConfig).single('file'), async (req, res) => {
  const { originalname: name, size, key, location: url = '' } = req.file
  const imageUpload = await Upload.create({
    name,
    size,
    key,
    url
  })
  return res.status(200).json(imageUpload)
})

module.exports = router
