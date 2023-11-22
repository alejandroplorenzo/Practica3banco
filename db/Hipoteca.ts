import mongoose from "npm:mongoose@7.6.3";
import { Hipoteca } from "../types.ts";

const Schema = mongoose.Schema;

const hipotecaSchema = new Schema(
    {
      valor: { type: Number, required: true},
      cuota: { type: Number, required: false},
      clienteID: {type: Schema.Types.ObjectId, required: true},
      gestorID: {type: Schema.Types.ObjectId, required: true},
    },
    { timestamps: true }
  );
  
  export type hipotecaModelType = mongoose.Document & Omit<Hipoteca, "id"> & {
    clienteID: mongoose.Types.ObjectId;
    gestorID: mongoose.Types.ObjectId;
  };
  
  export default mongoose.model<hipotecaModelType>("Hipoteca", hipotecaSchema);

