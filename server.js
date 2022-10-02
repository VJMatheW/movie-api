const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const app = express()
app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use('/api/movie', require('./routes'))

app.listen(3000, ()=>{
    console.log(`Server listening on port 3000`)
})