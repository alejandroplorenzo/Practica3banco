import mongoose from "npm:mongoose@7.6.3";
import { Gestor } from "../types.ts";

const Schema = mongoose.Schema;

const gestorSchema = new Schema(
    {
      name: { type: String, required: true},
      clienteID: [{ type: Schema.Types.ObjectId, ref: "Cliente" , required: false}],
    },
    { timestamps: true }
  );

  export type gestorModelType = mongoose.Document & Omit<Gestor, "id"> & {
    clienteID: Array<mongoose.Types.ObjectId>;
  };
  
  export default mongoose.model<gestorModelType>("Gestor", gestorSchema);
