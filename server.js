const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const db = require('./koneksi')
const response = require('./response')
// app.set('view engine', 'ejs')

// app.get('/', (req, res) => {
//     res.render('pages/index');
//   });


// app.get('/about',(req,res) => {
//     res.render('pages/about')
// })
// app.set('view engine', 'ejs')

app.use(bodyParser.json())

app.put('/username',(req, res)=>{
    console.log({updateData:req.body})
    res.send('Berhasil')
})

app.get('/', (req, res) => {
    db.query("SELECT * FROM mahasiswa",(error, result) => {
        response(200,result,'get all data from mahasiswa',res)
    })
  });


app.get('/mahasiswa/:nim',(req,res) => {
    const nim = req.params.nim
    const sql = `SELECT nama_lengkap FROM mahasiswa  WHERE nim = ${nim}`
    db.query(sql, (error,result)=>{
        if (error) throw error
        response(200, result, `find mahasiswa name with nim ${nim} `, res)
    })
    // console.log({'get nim': req.query.nim})
    // console.log({param: req.query})
    // res.send('Hello world lalaldasda')
})
app.post('/mahasiswa',(req,result) => {
    const {nim, nama_lengkap, kelas, alamat} = req.body

    const sql = `INSERT INTO mahasiswa (nim, nama_lengkap, kelas, alamat) VALUES (${nim}, '${nama_lengkap}', '${kelas}', '${alamat}')`
    
    db.query(sql, (err, field)=>{
        if(err) throw err
        if (field.affectedRows){
            response(200, field.insertId,  "INI BERHASIL POST DATA", result)
            console.log('data in')
        } 
    })
    // result.send('oke')
    
    })

app.listen(8080)
console.log('server listenig port 8080')