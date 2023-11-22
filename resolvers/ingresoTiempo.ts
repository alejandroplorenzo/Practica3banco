import { Request, Response } from "npm:express@4.18.2";
import ClientModel from "../db/Cliente.ts";

const ingresoTiempo = async (_req: Request, res: Response) => {
    try {
        const clientes = await ClientModel.find().exec();
        if (clientes.length === 0 || !clientes ) {
            if (res) {
                res.status(404).send("No hay clientes");
            }
            return;
        }
        await Promise.all(clientes.map(async (cliente) => {
            await ClientModel.updateOne({ _id: cliente._id }, { $inc: { dinero: 10000 } });
        }));

        if (res) {
            res.status(200).send("Ingreso");
        }
    } catch (error) {
        if (res) {
            res.status(404).send(error.message);
        }
        return;
    }
};

setInterval(async () => {
    await ingresoTiempo(null, null);  
}, 5 * 60 * 1000);

export default ingresoTiempo;
