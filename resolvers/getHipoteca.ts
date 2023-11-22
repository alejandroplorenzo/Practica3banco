import { Request, Response } from "npm:express@4.18.2";
import HipotecaModel from "../db/Hipoteca.ts";

const getHipoteca = async (_req: Request, res: Response) => {
    try{
        const hipoteca = await HipotecaModel.find().exec();
        if (!hipoteca) {
            res.status(404).send("Hipoteca not found");
            return;
        }
        res.status(200).send(hipoteca);
    }catch(error){
        res.status(404).send(error.message);
        return;
    }
}
export default getHipoteca;