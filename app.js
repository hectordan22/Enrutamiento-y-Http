
const express = require('express');

const path = require('path');

const app = express();

// settings 
app.set('views', path.resolve(__dirname, 'views'));

app.set('view engine', 'ejs');

// MIDDLEWARES

app.use(express.urlencoded({extended: false}));

app.use(express.json())

//RUTAS

// Rutas generales del proyecto
app.use('/', require('./router/rutas_proyecto'))
// Rutas solo para el crud de estudiantes

app.use('/estudiantes', require('./router/estudiantes'));


// LISTEN SERVER
 const puerto = 3000;

app.listen(puerto,()=>{
    console.log(`Servidor escuchando en el puerto ${puerto}`)
})
