const connectToMongo = require('./db')
const express = require('express')
connectToMongo()
const bodyParser = require('body-parser')
const app = express()
const port = 5000
const authRoute = require('./routes/auth')
const notesRoute = require('./routes/notes')
var cors = require('cors')


app.use(cors())  //Deals with the CORS policy.

app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false })) //middleware used to deal with request body.
//Available Routes:
app.use('/api/auth', authRoute)
// app.post('/api/auth/login', require('./routes/auth'))
// app.post('api/auth/getuser'), require('./routes/auth')

app.use('/api/notes', notesRoute)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`iNotebook app listening on port http://localhost:${port}`)
})

