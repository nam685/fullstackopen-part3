const mongoose = require('mongoose')

if (process.argv.length !== 3 && process.argv.length !== 5) {
  console.log('Usage: node mongo.js yourpassword')
  process.exit(1)
}
const password = process.argv[2]
const isUpload = process.argv.length === 5
const url = `mongodb+srv://nam685:${password}@cluster0.vsacmwc.mongodb.net/?retryWrites=true&w=majority`


mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  phone: String,
})

const Person = mongoose.model('Person', personSchema)

if (isUpload) {
  const person = new Person({
    name: process.argv[3],
    phone: process.argv[4],
  })

  person.save().then(() => {
    console.log('Person saved!')
    mongoose.connection.close()
  })
} else {
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
}
