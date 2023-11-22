import { Request, Response } from "npm:express@4.18.2";
import ClientModel from "../db/Cliente.ts";

const transferencia = async (req: Request, res: Response) => {
  try {
    const { id1, id2, cantidad } = req.body;
    const cant = Number(cantidad);

    const cliente1 = await ClientModel.findById(id1).exec();
    if (!cliente1) {
      res.status(404).send("Cliente no encontrado");
      return;
    }
    const cliente2 = await ClientModel.findById(id2).exec();
    if (!cliente2) {
      res.status(404).send("Cliente no encontrado");
      return;
    }
    if(!cantidad){
        res.status(400).send("Se necesita una cantidad a transferir");
        return;
    }    

    cliente1.dinero -=  cant;
    cliente2.dinero +=  cant;

    await Promise.all([cliente1.save(), cliente2.save()]);

    res.status(200).send("Transferencia realizada");
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default transferencia;