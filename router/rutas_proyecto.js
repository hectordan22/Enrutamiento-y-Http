// este archivo contiene todas las rutas generales de mi proyecto

const express = require("express");

rutas = express.Router()


rutas.get("/",(req,res)=>{
    res.send('Bienvenidos a mi servidor')
 })

 module.exports = rutas;