const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
})

// GET student - returns a list of all students
const getStudents = (request, response) => {
    pool.query('SELECT * FROM students ORDER BY id ASC', (error, results) => {
        if(error) {
            throw error;
        }

        response.status(200).json(results.rows);
    })
}

// GET students/:studentId - returns details of a specific student by student id
const getStudentById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM students WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

// GET student?search= - returns a list of students filtered on name matching the given query
const getStudentBySearch = (request, response) => {

    const query = request.query.search

    pool.query('SELECT * FROM students WHERE name = $1', [query], (error, results) => {
        if(error) {
            throw error
        }

        response.status(200).json(results.rows)
    }) 
}


// GET grades/:studentId - returns all grades for a given student by student id
const getGradesById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT grades FROM students WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }


// POST grade - records a new grade, returns success status in JSON response and stores the new grade in the database
const postGradeById = (request, response) => {
    const id = parseInt(request.params.id)
    const grade = [request.body.grade]
  
    if(grade) {
        pool.query('UPDATE students SET grades = array_cat(grades, $1) FROM students WHERE id = $2', [grade, id], (error, results) => {
            if (error) {
              throw error
            }
            response.status(201)
            response.json(results.row)
        })
    }
}


// POST register - creates a new user, returns success status in JSON response and stores the new user in the database
const register = (request, response) => {
    const user = {email:request.body.email, password:request.body.password}

    if(user.email && user.pass) {
        pool.query('INSERT INTO users (email, password) VALUES ($1, $2)', [user.email, user.password], (error, results) => {
            if (error) {
                throw error
            }
            response.status(201)
            response.json(results.row)
        })
    }
  }

module.exports = {
    getStudents,
    getStudentById,
    getStudentBySearch,
    getGradesById,
    postGradeById,
    register
  }