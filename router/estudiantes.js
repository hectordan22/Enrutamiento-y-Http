// este archivo contiene todas las rutasdel crud estudiantes

const express = require("express");
 rutas = express.Router()

const fs = require("fs"); // este modulo solo se requiere mas no se descarga



const json_alumnos = fs.readFileSync('bd/alumnos.json', 'utf-8');
var estudiantes = JSON.parse(json_alumnos);        // si hay algo que leer si se devolvera arreglo

var id = estudiantes.length  



rutas.get("/mostrar",(req,res)=>{
    
        res.render('mostrar',{
            estudiantes
        })
 })


 rutas.get("/registrar",(req,res)=>{
    res.render('registrar')
})

     


 rutas.post("/registrar",(req,res)=>{

     var total_registros = estudiantes.length
     

     if (total_registros<20) {
          // saco las variables
       const {nombre,cedula,correo} = req.body
       id++
       
       // valido de que todos los valores sean correctos
       if (!nombre || !cedula || !correo) {
        // en caso de que no ; lanzo error
        res.status(400).send("Todos los datos son obligatorios")
        return;
      }

      // de lo contrario creo un nuevo objeto con esos valores recibidos
       var seccion = "A"
      let new_student = {
        nombre,
        cedula,
        correo,
        id,
        seccion
      }
    
       // actualizo el arreglo estudiantes
       estudiantes.push(new_student)
  

       // transformo el arreglo estudiantes a un String para poder guardarlo en JSON
       const string_estudiantes = JSON.stringify(estudiantes)

       // Escribir en  nuestro archivo json dicho string transformado
       fs.writeFileSync('bd/alumnos.json',string_estudiantes,'utf-8')
        
      
       res.redirect('/estudiantes/mostrar')
       
    
      } else if (total_registros >=20 && total_registros<45) {
            // saco las variables
         const {nombre,cedula,correo} = req.body
         id++
         // valido de que todos los valores sean correctos
         if (!nombre || !cedula || !correo) {
         // en caso de que no ; lanzo error
          res.status(400).send("Todos los datos son obligatorios")
          return;
         }
         // de lo contrario creo un nuevo objeto con esos valores recibidos
         var seccion = "B"
          let new_student = {
          nombre,
          cedula,
          correo,
          id,
          seccion
         }
    
         // actualizo el arreglo estudiantes
          estudiantes.push(new_student)
  

         // transformo el arreglo estudiantes a un String para poder guardarlo en JSON
         const string_estudiantes = JSON.stringify(estudiantes)
         // Escribir en  nuestro archivo json dicho string transformado
         fs.writeFileSync('bd/alumnos.json',string_estudiantes,'utf-8')
          
         res.redirect('/estudiantes/mostrar')
   
    
      } else {
        if (total_registros>=45 && total_registros < 60) {
               // saco las variables
           const {nombre,cedula,correo} = req.body
           id++
           // valido de que todos los valores sean correctos
           if (!nombre || !cedula || !correo) {
           // en caso de que no ; lanzo error
           res.status(400).send("Todos los datos son obligatorios")
           return;
          }
         // de lo contrario creo un nuevo objeto con esos valores recibidos
         var seccion = "C"
         let new_student = {
           nombre,
           cedula,
           correo,
            id,
            seccion
         }
    
         // actualizo el arreglo estudiantes
         estudiantes.push(new_student)
  

          // transformo el arreglo estudiantes a un String para poder guardarlo en JSON
          const string_estudiantes = JSON.stringify(estudiantes)
         // Escribir en  nuestro archivo json dicho string transformado
         fs.writeFileSync('bd/alumnos.json',string_estudiantes,'utf-8')
         
         res.redirect('/estudiantes/mostrar')
   
    
        }
        if (total_registros==60) {
            res.status(200).send("ERROR : Lo sentimos...Ya no hay Cupos disponibles para la materia Backend")
            return;
        }
      }
    
 })


 

   rutas.delete("/eliminar/:id",(req,res)=>{

       // obtenemos el id del estudiante
       var id_estudiante = req.params.id


       // compruebo si almenos hay un registro con ese id
       let si_existe = estudiantes.filter(estudiante => estudiante.id == id_estudiante );


       if (si_existe.length==0) {
        res.status(400).send("Error: no existe ningun estudiante con ese id")
        return;

       } else{
       
           // retornamos un nuevo array con todos los elementos distintos a dicho id
           
         let nuevos = estudiantes.filter(estudiante => estudiante.id != id_estudiante );
         //  => retorno implicito

         // vacio el array estudiantes
         estudiantes.length=0
         /* itero sobre el array llamado nuevos para
          llenar estudiantes con nueva informacion */
         for (let x = 0; x < nuevos.length; x++) {
           estudiantes.push(nuevos[x])
         }
         
         // SOBREESCRIBO LOS NUEVOS DATOS
         // una vez tengo el array estudiantes sin ese id lo  escribo en alumnos.json
         // transformo el arreglo  a un String para poder guardarlo en JSON

         const string_estudiantes = JSON.stringify(estudiantes)
         // Escribir en  nuestro archivo json dicho string transformado
         fs.writeFileSync('bd/alumnos.json',string_estudiantes,'utf-8')
          // hago la redireccion hacia donde muestro los registros
          res.redirect('/estudiantes/mostrar')

       }
       
      
    })


    rutas.put("/editar/:id",(req,res)=>{

         // obteniendo parametro de ruta id
        var id_estudent = req.params.id

        let filtrado = estudiantes.filter(estudiante => estudiante.id == id_estudent );

          
        if (filtrado.length==0) {
            res.status(400).send("Error: no existe ningun estudiante con ese id")
            return;

        }else{
        
          // sobreescribo los valores de nuestro nuevo array filtrado
         // con los datos que obtengo desde el cuerpo de la peticion
         filtrado[0].nombre = req.body.nombre
         filtrado[0].cedula = req.body.cedula
         filtrado[0].correo = req.body.correo
        
         /* recorro estudiantes y donde los id de ambos array coincidan 
          paso el nuevo objeto en su debida posicion para asi actualizar el
          array estudiantes con los nuevos valores
         */


         for (let a = 0; a < estudiantes.length; a++) {
            if (estudiantes[a].id == filtrado[0].id) {
                estudiantes[a]=filtrado[0]
                break;
            }
           
         }


         // ACTUALIZAMOS NUESTRO ARCHIVO JSON
         // transformo el arreglo  a un String para poder guardarlo en JSON
         const string_estudiantes = JSON.stringify(estudiantes)
          // Escribir en  nuestro archivo json dicho string transformado
         fs.writeFileSync('bd/alumnos.json',string_estudiantes,'utf-8')
         res.redirect('/estudiantes/mostrar')

        }
        
    })

 module.exports = rutas;