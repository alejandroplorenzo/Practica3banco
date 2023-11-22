import express from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.3";
import {load} from "https://deno.land/std@0.204.0/dotenv/mod.ts";

import postCliente from "./resolvers/postCliente.ts";
import postGestor from "./resolvers/postGestor.ts";
import postHipoteca from "./resolvers/postHipoteca.ts";
import deleteCliente from "./resolvers/deleteCliente.ts";
import getCliente from "./resolvers/getCliente.ts";
import transferencia from "./resolvers/transferencia.ts";
import ingreso from "./resolvers/ingreso.ts";
import amortizar from "./resolvers/amortizar.ts";
import getGestor from "./resolvers/getGestor.ts";
import getHipoteca from "./resolvers/getHipoteca.ts";
import deleteGestor from "./resolvers/deleteGestor.ts";
import deleteHipoteca from "./resolvers/deleteHipoteca.ts";
import asignarGestor from "./resolvers/asignarGestor.ts";
import putGestor from "./resolvers/putGestor.ts";
import ingresoTiempo from "./resolvers/ingresoTiempo.ts"; 
import pagarHipoteca from "./resolvers/pagarHipoteca.ts"; 
import putCliente from "./resolvers/putCliente.ts"; 
import putHipoteca from "./resolvers/putHipoteca.ts"; 

const env = await load();
const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL");

if (!MONGO_URL) {
  console.log("No mongo URL found");
  Deno.exit(1);
}

try{
  await mongoose.connect(MONGO_URL);
  console.info("Se conecta bien a Mongo");
}catch(e){
  console.error(e);
}

const app = express();
app.use(express.json());

app
  .get("/cliente", getCliente)
  .get("/gestor", getGestor)
  .get("/hipoteca", getHipoteca)
  .post("/postcliente", postCliente)
  .post("/postgestor", postGestor)
  .post("/posthipoteca", postHipoteca)
  .put("/transferencia", transferencia)
  .put("/amortizar/:id/:cantidad", amortizar)
  .put("/ingreso/:id/:cantidad", ingreso)
  .put("/asignarGestor", asignarGestor)
  .put("/ingresoTiempo", ingresoTiempo)
  .put("/pagarHipoteca", pagarHipoteca)
  .put("/putCliente/:id", putCliente)
  .put("/putHipoteca/:id", putHipoteca)
  .put("/putGestor/:id", putGestor)
  .delete("/deletegestor/:id", deleteGestor)
  .delete("/deletehipoteca/:id", deleteHipoteca)
  .delete("/deletecliente/:id", deleteCliente);


app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
