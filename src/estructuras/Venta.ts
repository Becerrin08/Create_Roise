interface Venta {
    idVenta: number;
    producto: string;
    cantidad: number;
    subtotal: number;
}

export class Ventas {
    // Declaración e inicialización de la propiedad
    ventasArray: Venta[] = [];

    agregarVenta(
        idVenta: number,
        producto: string,
        cantidad: number,
        subtotal: number
    ) {
        this.ventasArray.push({
            idVenta: idVenta,
            producto: producto,
            cantidad: cantidad,
            subtotal: subtotal
        });

        console.log("----------------------------");
        console.log("---- VENTA REGISTRADA ----");
        console.log("----------------------------");
        console.dir(this.ventasArray, { depth: null, colors: true });
    }
}