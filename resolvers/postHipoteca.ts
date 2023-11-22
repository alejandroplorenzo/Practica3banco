import { Request, Response } from "npm:express@4.18.2";
import HipotecaModel from "../db/Hipoteca.ts"; 


const postHipoteca = async (req: Request, res: Response) => {
    try{
        const {valor, cuota, clienteID, gestorID} = req.body;
        if(!valor || !clienteID|| !gestorID){
            res.status(400).send("Se necesita valor o cliente o gestor");
            return;
        };

        if(valor >= 1000000){
            res.status(400).send("La hipoteca no puede ser mayor a 1 millon");
            return;
        };

        const newHipoteca = new HipotecaModel({ valor, clienteID, gestorID});
        if (cuota) {
            newHipoteca.cuota = cuota;
        }
        await newHipoteca.save();

        res.status(200).send({
            valor: newHipoteca.valor,
            cuota: newHipoteca.cuota,
            cliente: newHipoteca.clienteID,
            gestor: newHipoteca.gestorID,
            id: newHipoteca._id.toString(),
          });

    }catch(error){
        res.status(500).send(error.message);
        return;
    }
};

export default postHipoteca;