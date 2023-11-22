import { Request, Response } from "npm:express@4.18.2";
import GestorModel from "../db/Gestor.ts";

const getGestor = async (_req: Request, res: Response) => {
    try{
        const gestor = await GestorModel.find().exec();
        if (!gestor) {
            res.status(404).send("Gestor not found");
            return;
        }
        res.status(200).send(gestor);
    }catch(error){
        res.status(404).send(error.message);
        return;
    }
}
export default getGestor;