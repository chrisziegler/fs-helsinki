const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log(
    'Please provide the password as an argument: node mongo.js <password>',
  )
  process.exit(1)
}

const password = process.argv[2]
const dbName = 'note-app'

const url = `mongodb+srv://cz-fs-helsinki:${password}@cluster0.otgwe.mongodb.net/${dbName}?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

// const note = new Note({
//   content: 'JavaScript is Everywhere',
//   date: new Date(),
//   important: false,
// })

// note.save().then(result => {
//   console.log('note saved!')
//   mongoose.connection.close()
// })

Note.find({ important: true }).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})
