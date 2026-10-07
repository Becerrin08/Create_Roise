interface Insumo {
    id: number;
    nombre: string;
    categoria: string;
    stockActual: number;
    stockMinimo: number;
    precioUnitario: number;
}

export class Insumos {

    insumosArray: Insumo[] = [];
    agregarInsumo(
        id: number,
        nombre: string,
        categoria: string,
        stockActual: number,
        stockMinimo: number,
        precioUnitario: number
    ) {
        this.insumosArray.push({
            id: id,
            nombre: nombre,
            categoria: categoria,
            stockActual: stockActual,
            stockMinimo: stockMinimo,
            precioUnitario: precioUnitario
        });
        
        console.log("----------------------------");
        console.log("---- INSUMO AGREGADO ----");
        console.log("----------------------------");
        console.dir(this.insumosArray, { depth: null, colors: true });
    }

     buscarInsumoFind(nombre: string) {
        console.log("----------------------------");
        console.log("---- BÚSQUEDA FIND INSUMO ----");
        console.log("----------------------------");
        console.log(this.insumosArray.find(i => i.nombre.toLowerCase() === nombre.toLowerCase()));
    }
}