const mysql = require('mysql2/promise')

const pool = mysql.createPool({
    host: 'movie-database.cu9womrvreus.ap-south-1.rds.amazonaws.com',
    user: 'admin',
    password: 'admin123',
    database: 'movie',
    connectionLimit: 10
})

pool.on('connection', (conn)=>{
    console.log("DB Connected")
})

module.exports = pool
