const mongoose = require('mongoose')

const Quizz = mongoose.model('Quizz', {
  model: String,
  title: String,
  subtitle: String,
  photo: String,
  type: Array,
  results: [
    {
      photo: String,
      name: String,
      minValue: Number || null,
      maxValue: Number || null
    }
  ],
  questions: [
    {
      photo: String,
      color: String,
      title: String,
      subtitle: String,
      answer: [{ label: String, value: Number }]
    }
  ]
})

module.exports = Quizz
