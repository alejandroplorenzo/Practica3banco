import { Request, Response } from "npm:express@4.18.2";
import ClientModel from "../db/Cliente.ts";

const getCliente = async (_req: Request, res: Response) => {
    try{
        const cliente = await ClientModel.find().exec();
        if (!cliente) {
            res.status(404).send("Client not found");
            return;
        }
        res.status(200).send(cliente);
    }catch(error){
        res.status(404).send(error.message);
        return;
    }
}

export default getCliente;