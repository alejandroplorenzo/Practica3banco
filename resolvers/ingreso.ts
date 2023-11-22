import { Request, Response } from "npm:express@4.18.2";
import ClientModel from "../db/Cliente.ts";

const ingreso = async (req: Request, res: Response) => {
  try {
    const { id, cantidad } = req.params;
    const cant = Number(cantidad);
    
    const cliente1 = await ClientModel.findById(id).exec();
    if (!cliente1) {
      res.status(404).send("Cliente no encontrado");
      return;
    }

    if(!cantidad){
        res.status(400).send("Se necesita una cantidad a ingresar");
        return;
    }    

    cliente1.dinero +=  cant;

    await Promise.all([cliente1.save()]);

    res.status(200).send("Ingreso realizado");
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default ingreso;