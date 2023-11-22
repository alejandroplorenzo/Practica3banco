export type Cliente = {
    name: string;
    dni: string;
    dinero: number;
    gestor: Gestor;
};

export type Gestor = {
    name: string;
    cliente: Array<Cliente>;
}

export type Hipoteca = {
    valor: number;
    cuota: number;
    cliente: Cliente;
    gestor: Gestor;
}