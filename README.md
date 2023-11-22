# Practica3banco
  get("/cliente") Muestra todos los clientes creados
  get("/gestor") Muestra todos los gestores creados
  get("/hipoteca") Muestra todas hipotecas creadas
  post("/postcliente") Publica un cliente
  post("/postgestor") Publica un gestor
  post("/posthipoteca") Publica una hipoteca
  put("/transferencia") Realiza una transferencia entre un cliente y otro
  put("/amortizar/:id/:cantidad") Amortiza una cantidad decidida por el usuario introduciando el id de la hipoteca y dicha cantidad
  put("/ingreso/:id/:cantidad") Ingresa una cantidad determinada a un cliente introduciando el id del cliente y dicha cantidad
  put("/asignarGestor") Asigna un gestor a un cliente
  put("/ingresoTiempo") Cada 5 minutos se ingresaran a todos los clientes del banco 10.000 Euros
  put("/pagarHipoteca") Cada 5 minutos se pagaran las cuotas de las hipotecas
  put("/putCliente/:id") Actualiza un cliente introduciendo su id
  put("/putHipoteca/:id") Actualiza una hipoteca introduciendo su id
  put("/putGestor/:id") Actualiza un gestor introduciendo su id
  delete("/deletegestor/:id") Borra un gestor introduciendo su id
  delete("/deletehipoteca/:id") Borra una hipoteca introduciendo su id
  delete("/deletecliente/:id") Borra un cliente introduciendo su id

Estos son los campos de cada Cliente/Gestor/Hipoteca:
type Cliente = {
    name: string;
    dni: string;
    dinero: number;
    gestor: Gestor;
};
type Gestor = {
    name: string;
    cliente: Array<Cliente>;
}
type Hipoteca = {
    valor: number;
    cuota: number;
    cliente: Cliente;
    gestor: Gestor;
}

const clienteSchema = new Schema(
    {
      name: { type: String, required: true},
      dni: { type: String, required: true, unique: true},
      dinero: {type: Number, required: true},
      gestorID: {type: Schema.Types.ObjectId, ref: "Gestor", required: false},
    },
    { timestamps: true }
  );
const gestorSchema = new Schema(
    {
      name: { type: String, required: true},
      clienteID: [{ type: Schema.Types.ObjectId, ref: "Cliente" , required: false}],
    },
    { timestamps: true }
  );
  const hipotecaSchema = new Schema(
    {
      valor: { type: Number, required: true},
      cuota: { type: Number, required: false},
      clienteID: {type: Schema.Types.ObjectId, required: true},
      gestorID: {type: Schema.Types.ObjectId, required: true},
    },
    { timestamps: true }
  );
