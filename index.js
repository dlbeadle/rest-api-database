const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const db = require('./queries')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/students', db.getStudents)
app.get('/students/:id', db.getStudentById)
app.get('/student', db.getStudentBySearch)
app.get('/grades/:id', db.getGradesById)
app.post('/grades', db.postGradeById)
app.post('/register', db.register)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})

module.exports = app;