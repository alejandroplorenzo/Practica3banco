import mongoose from "npm:mongoose@7.6.3";
import { Cliente } from "../types.ts";

const Schema = mongoose.Schema;

const clienteSchema = new Schema(
    {
      name: { type: String, required: true},
      dni: { type: String, required: true, unique: true},
      dinero: {type: Number, required: true},
      gestorID: {type: Schema.Types.ObjectId, ref: "Gestor", required: false},
    },
    { timestamps: true }
  );
  
  export type clienteModelType = mongoose.Document & Omit<Cliente, "id"> & {
    gestorID: mongoose.Types.ObjectId;
  };
  
  export default mongoose.model<clienteModelType>("Cliente", clienteSchema);