import { Request, Response } from "npm:express@4.18.2";
import HipotecaModel from "../db/Hipoteca.ts";

const amortizar = async (req: Request, res: Response) => {
  try {
    const { id, cantidad } = req.params;
    const cant = Number(cantidad);
    
    const hipoteca = await HipotecaModel.findById(id).exec();
    if (!hipoteca) {
      res.status(404).send("Hipoteca no encontrada");
      return;
    }

    if(!cantidad){
        res.status(400).send("Se necesita una cantidad a amortizar");
        return;
    }    

    hipoteca.valor -=  cant;

    await Promise.all([hipoteca.save()]);

    res.status(200).send("Amortización realizada");
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default amortizar;