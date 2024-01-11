import db from 'database/models';

export default function handler(req, res) {
    switch(req.method){
        case 'POST':
            return addUser(req, res);
        case 'GET':
            return listUser(req, res);
        case 'DELETE':
            return deleteUser(req, res);
        case 'PUT':
            return updateUser(req,res);
        default:
            res.status(400).json({error: true, message:'Petición errónea'});
    }
  }

  const addUser = async (req, res) =>  {

        try{
            //los datos vienen del req.body
            console.log(req.body);
            //guardar cliente
            const productos = await db.User.create({...req.body});
    
            res.json({
                productos,
                message: 'El usuario fue agregado correctamente'
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

const listUser = async (req, res) => {
    try{
        
        console.log(req.body);
        
        const users = await db.User.findAll({
            include: [
                {
                    model: db.Status,
                    as: 'statusId',
                    attributes: ['rolName'],
                },
                {
                    model: db.Courses,
                    as: 'courses',
                    attributes: ['name'],
                },
            ],
            attributes: ['id', 'name', 'lastName', 'phone', 'email', 'address', 'status', 'area'],
        });

        return res.json(users);
    }catch(error){
        console.log(error);
        let errors = []

        if(error.errors){
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

const deleteUser = async (req,res) => {
    try{
      const {id} = req.query;

        await db.User.destroy({
            where: { id: id }
        })

        res.json({
            message: 'El Usuario a sido eliminado'
        })

      }
         catch (error){
            res.status(400).json({ error: "error al momento de borrar usuario"})
    }
}

const updateUser = async (req,res) => {

    try{
        let {id} = req.query;
        await db.User.update({...req.body},
            {
            where :{ id : id }
        })
     
        res.json({
            message: 'El usuario fue actualizado'
        })

      }
      catch (error) {

        console.log(error);

        let errors = [];
        if (error.errors){
            errors = error.errors.map((item) => ({
                error: item.message,
                field: item.path,
                }));
        }
      return res.status(400).json( {
        error: true,
        message: `Ocurrió un error al procesar la petición: ${error.message}`,
        errors,
        } 
      )
    }
}
