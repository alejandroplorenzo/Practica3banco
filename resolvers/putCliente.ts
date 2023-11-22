import { Request, Response } from "npm:express@4.18.2";
import ClientModel from "../db/Cliente.ts";

const putCliente = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, dni, dinero, gestorID } = req.body;
    
    if (!name || !dni || !dinero || !gestorID) {
      res.status(400).send("Falta dni o name o dinero o gestorID");
      return;
    }

    const updatedCliente = await ClientModel.findOneAndUpdate(
      { _id: id },
      { name, dni, dinero, gestorID },
      { new: true }
    ).exec();

    if (!updatedCliente) {
      res.status(404).send("Client not found");
      return;
    }

    res.status(200).send({
      name: updatedCliente.name,
      dni: updatedCliente.dni,
      dinero: updatedCliente.dinero,
      gestorID: updatedCliente.gestorID,
      id: updatedCliente._id.toString(),
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default putCliente;