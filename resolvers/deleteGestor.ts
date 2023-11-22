import { Request, Response } from "npm:express@4.18.2";
import GestorModel from "../db/Gestor.ts";

const deleteGestor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const gestor = await GestorModel.findByIdAndDelete( id ).exec();
    if (!gestor) {
      res.status(404).send("Gestor not found");
      return;
    }
    res.status(200).send("Gestor deleted");
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};
export default deleteGestor;