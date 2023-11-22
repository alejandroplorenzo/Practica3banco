import { Request, Response } from "npm:express@4.18.2";
import ClientModel from "../db/Cliente.ts"; 

const postCliente = async (req: Request, res: Response) => {
    try{
        const {name, dni, dinero, gestorID} = req.body;
        if(!name || !dni || !dinero ){
            res.status(400).send("Se necesita nombre, dni y dinero");
            return;
        }

        const alreadyExists = await ClientModel.findOne({ dni }).exec();
        if (alreadyExists) {
          res.status(400).send("Client already exists");
          return;
        }

        const newClient = new ClientModel({ name, dni, dinero, gestorID});
        await newClient.save();

        res.status(200).send({
            name: newClient.name,
            dni: newClient.dni,
            dinero: newClient.dinero,
            gestor: newClient.gestorID,
            id: newClient._id.toString(),
          });

    }catch(error){
        res.status(500).send(error.message);
        return;
    }
};

export default postCliente;