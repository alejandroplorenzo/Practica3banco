import { Request, Response } from "npm:express@4.18.2";
import GestorModel from "../db/Gestor.ts";

const putGestor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, clienteID } = req.body;
    
    if (!clienteID || !name) {
      res.status(400).send("Falta clienteID o name ");
      return;
    }

    const updatedGestor = await GestorModel.findOneAndUpdate(
      { _id: id },
      { name, clienteID },
      { new: true }
    ).exec();

    if (!updatedGestor) {
      res.status(404).send("Gestor not found");
      return;
    }

    res.status(200).send({
      name: updatedGestor.name,
      clienteID: updatedGestor.clienteID,
      id: updatedGestor._id.toString(),
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default putGestor;