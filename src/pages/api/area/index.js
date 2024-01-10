import db from 'database/models';

export default function handler(req, res) {
    switch(req.method){
        case 'POST':
            return addArea(req, res);
        case 'GET':
            return listArea(req, res);
        default:
            res.status(400).json({error: true, message:'Petición errónea'});
    }
  }

const addArea = async (req, res) =>  {

        try{
            //los datos vienen del req.body
            console.log(req.body);
            //guardar cliente
            const productos = await db.Courses.create({...req.body});
    
            res.json({
                productos,
                message: 'El Curso fue agregado correctamente'
            })
        }catch(error){
            console.log(error);
            let errors = []
    
            if(error.errors){
                //extrae la info
                errors = error.errors.map((item) => ({
                    error: item.message, 
                    field: item.path,
                }));
            }
    
            return res.status(400).json({
                message: `Ocurrió un error al procesar la petición: ${error.message}`,
                errors,
            })
        }
    }

const listArea = async (req, res) => {
    try{
        //los datos vienen del req.body
        console.log(req.body);
        //guardar cliente
    const can = await db.Courses.findAll({
        
    });
        
        return res.json(can)
    
    }catch(error){
        console.log(error);
        let errors = []

        if(error.errors){
            //extrae la info
            errors = error.errors.map((item) => ({
                error: item.message, 
                field: item.path,
            }));
        }

        return res.status(400).json({
            message: `Ocurrió un error al procesar la petición: ${error.message}`,
            errors,
        })
    }
}

// const deleteUser = async (req,res) => {
//     try{
//       const {id} = req.query;

//         await db.User.destroy({
//             where: { id: id }
//         })

//         res.json({
//             message: 'El Usuario a sido eliminado'
//         })

//       }
//          catch (error){
//             res.status(400).json({ error: "error al momento de borrar usuario"})
//     }
// }

// const updateUser = async (req,res) => {

//     try{
//         let {id} = req.query;
//         await db.User.update({...req.body},
//             {
//             where :{ id : id }
//         })
     
//         res.json({
//             message: 'El usuario fue actualizado'
//         })

//       }
//       catch (error) {

//         console.log(error);

//         let errors = [];
//         if (error.errors){
//             errors = error.errors.map((item) => ({
//                 error: item.message,
//                 field: item.path,
//                 }));
//         }
//       return res.status(400).json( {
//         error: true,
//         message: `Ocurrió un error al procesar la petición: ${error.message}`,
//         errors,
//         } 
//       )
//     }
// }
