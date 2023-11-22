import { Request, Response } from "npm:express@4.18.2";
import GestorModel from "../db/Gestor.ts"; 

const MAX_CLIENTES = 10;

const postGestor = async (req: Request, res: Response) => {
    try{
        const {name, clienteID} = req.body;
        if(!name){
            res.status(400).send("Se necesita un nombre");
            return;
        }

        const alreadyExists = await GestorModel.findOne({ name }).exec();
        if (alreadyExists) {
          res.status(400).send("Gestor already exists");
          return;
        }

        const gestor = await GestorModel.findOne({ name }).exec();
        if (gestor && gestor.cliente.length >= MAX_CLIENTES) {
            res.status(400).send(`El gestor ${name} ya tiene el máximo de clientes`);
            return;
        }

        const newGestor = new GestorModel({ name, clienteID});
        await newGestor.save();

        res.status(200).send({
            name: newGestor.name,
            cliente: newGestor.clienteID,
            id: newGestor._id.toString(),
          });

    }catch(error){
        res.status(500).send(error.message);
        return;
    }
};
export default postGestor;