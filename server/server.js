//cuando empieze a leer este archivo va a ejecutar todo lo que este contenga
require('./config/config')


const express = require('express')

//? PARA QUE SIRVE BODY-PARSER??
//*Usualmente el cuerpo de una peticion (payload), contiene información desde una petición tipo POST cuando un cliente desea crear una nueva entidad/registro o actualizar uno existente mediante PUT. Los desarrolladores quienes implementan servidores, requieren frecuentemente accesar a la información del cuerpo de dicha petición.

// *El módulo npm body-parser permite realizar esta tarea. No es necesario programarla. Solo se requiere instalar body-parser y habilitar json() así como url-encode como middlewares para convertir datos a JSON.
let bodyParser = require('body-parser')



const app = express()
//? los app.use son middleweres, por ahora debemos saber que estos son unas funciones que cada peticion(cada vez que pasa por aqui el codigo) se van a disparar, mas adelante se vera en mas detalles

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/jsonw
app.use(bodyParser.json())


//Puntos entrada API

app.get('/', (req, res) => {
    res.json('welcome to apadrebee')
})



app.get('/usuario', (req, res) => {
    res.json('get of User')
})

//?post se usa cuando queremos crear nuevos datos
app.post('/usuario', (req, res) => {
    //este body es el que procesa body parser cada vez que se recibe un payload
    let body = req.body

    if (body.nombre === undefined || body.apellidos === undefined || body.email === undefined) {
        res.status(400).json({
            ok: false,
            msj: 'los campos nombre, apellidos y email son necesarios'
        })
    } else {

    }
    res.json({
        usuario: body
    })
})

//?put se usa cuando queremos actualizar datos
app.put('/usuario/:id', (req, res) => {

    let id = req.params.id

    res.json({
        id: id
    })
})

//* en el curso parece ser que se nos indica que en ahora en las bd ya no se borran registros sino que se modifica para que no este disponible
app.delete('/usuario', (req, res) => {
    res.json('delete of User')
})









app.listen(process.env.PORT, () => {
    console.log('server running on port ' + process.env.PORT);
})