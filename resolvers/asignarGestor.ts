import { Request, Response } from "npm:express@4.18.2";
import ClientModel from "../db/Cliente.ts";
import GestorModel from "../db/Gestor.ts";

const MAX_CLIENTES = 10;

const asignarGestor = async (req: Request, res: Response) => {
  try {

    const { id1, id2 } = req.body;

    const cliente = await ClientModel.findById(id1).exec();
    if (!cliente) {
      res.status(404).send("Cliente no encontrado");
      return;
    }
    const gestor = await GestorModel.findById(id2).exec();
    if (!gestor) {
      res.status(404).send("Gestor no encontrado");
      return;
    }

    if (gestor && gestor.cliente.length >= MAX_CLIENTES) {
        res.status(400).send(`El gestor ${name} ya tiene el máximo de clientes`);
        return;
    }

    cliente.gestorID = id2;
    gestor.clienteID.push(id1);

    await Promise.all([cliente.save(), gestor.save()]);

    res.status(200).send("Asignación realizada correctamente");
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};
export default asignarGestor;