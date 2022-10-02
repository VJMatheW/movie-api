const router = require('express').Router()
const db = require('./db')
const { authenticate } = require('./middleware')

router.get('/', async (req, res)=>{
    try{
        let query = `select * from tbl_movie tbl_movie`;
        let [rows, fields] = await db.query(query)
        
        res.cookie('authenticated', true, { maxAge: 300000, httpOnly: true });
        console.log('cookie created successfully');

        res.status(200).json(rows)
    }catch(err){
        res.status(500).json({ err })
    }
})

router.post('/', authenticate, async (req, res)=>{
    try{
        let { movie_name, rating, cast, genre, release_date } = req.body
        
        let obj = { movie_name, rating, cast: JSON.stringify(cast), genre, release_date }

        let result = await db.query(`insert into tbl_movie set ?`,obj)

        res.status(201).json({ id: result.insertId, ...obj, cast })
        
    }catch(err){
        res.status(500).json({ err })
    }
})

router.put('/:id', authenticate, async (req, res)=>{
    try{
        let id = req.params.id
        let { movie_name, rating, cast, genre, release_date } = req.body

        let obj = { movie_name, rating, cast: JSON.stringify(cast), genre, release_date }

        let result = await db.query(`update tbl_movie set ? where id = ?`, [obj, id])

        res.status(200).json({ id, ...obj, cast })
    }catch(err){
        res.status(500).json({ err })
    }
})

router.delete('/:id', authenticate, async (req, res)=>{
    try{
        let id = req.params.id

        let result = await db.execute(`delete from tbl_movie where id = ? `, [id])

        if(result.length > 0 && !result[0].affectedRows){
            return res.status(404).json({ err: "Deletion failed" })
        }

        res.status(200).json({ message: "Successfully deleted" })
    }catch(err){
        res.status(500).json({ err })
    }
})

module.exports = router