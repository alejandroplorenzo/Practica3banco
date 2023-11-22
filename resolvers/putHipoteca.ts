import { Request, Response } from "npm:express@4.18.2";
import HipotecaModel from "../db/Hipoteca.ts";

const putHipoteca = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { valor, clienteID, gestorID, cuota } = req.body;
    
    if (!valor || !clienteID || !gestorID) {
      res.status(400).send("Falta valor o clienteID o gestorID");
      return;
    }

    const update:any = { valor, clienteID, gestorID };

    if (cuota) {
      update.cuota = cuota;
    }

    const updatedHipoteca = await HipotecaModel.findOneAndUpdate(
      { _id: id },
      update,
      { new: true }
    ).exec();

    if (!updatedHipoteca) {
      res.status(404).send("Hipoteca not found");
      return;
    }

    res.status(200).send({
      valor: updatedHipoteca.valor,
      cuota: updatedHipoteca.cuota,
      clienteID: updatedHipoteca.clienteID,
      gestorID: updatedHipoteca.gestorID,
      id: updatedHipoteca._id.toString(),
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default putHipoteca;