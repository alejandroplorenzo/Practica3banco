import { Request, Response } from "npm:express@4.18.2";
import HipotecaModel from "../db/Hipoteca.ts";

const pagarHipoteca = async (req: Request, res: Response) => {
  try {
    const hipoteca = await HipotecaModel.find().exec();
    if (!hipoteca || hipoteca.length === 0) {
      if(res){
        res.status(404).send("Hipotecas no encontrada");
      }
      return;
    }

    await Promise.all(hipoteca.map(async (hipoteca) => {
      const cantidad = hipoteca.valor/20;
      hipoteca.valor -= cantidad;

      if(hipoteca.valor <= 0){
        console.log(`La hipoteca ${hipoteca._id} se ha pagado totalmente.`);
      }

      await hipoteca.save();
      })
    );

    if (res) {
      res.status(200).send("Pago de cuota realizado");
    }
  } catch (error) {
    if (res) {
      res.status(404).send(error.message);
    }
    return;
  }
};

setInterval(async () => {
  await pagarHipoteca(null, null);
}, 5 * 60 * 1000);

export default pagarHipoteca;