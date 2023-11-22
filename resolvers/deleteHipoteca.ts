import { Request, Response } from "npm:express@4.18.2";
import HipotecaModel from "../db/Hipoteca.ts";

const deleteHipoteca = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const hipoteca = await HipotecaModel.findByIdAndDelete( id ).exec();
    if (!hipoteca) {
      res.status(404).send("Hipoteca not found");
      return;
    }
    res.status(200).send("Hipoteca deleted");
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};
export default deleteHipoteca;