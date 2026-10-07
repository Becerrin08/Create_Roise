export interface IEgreso {
    idEgreso: number;
    concepto: string;      // ej. "Compra de verduras", "Recarga de Gas LP", "Aderezos"
    monto: number;
    categoria: string;     // ej. "Insumos", "Servicios", "Mantenimiento"
    fecha: string;
}

export class Egreso {
    egresosArray: IEgreso[] = [];

    agregarEgreso(
        idEgreso: number,
        concepto: string,
        monto: number,
        categoria: string,
        fecha: string
    ) {
        this.egresosArray.push({
            idEgreso: idEgreso,
            concepto: concepto,
            monto: monto,
            categoria: categoria,
            fecha: fecha
        });

        console.log("----------------------------");
        console.log("---- EGRESO REGISTRADO ----");
        console.log("----------------------------");
        console.dir(this.egresosArray, { depth: null, colors: true });
    }

    mostrarEgresos(): void {
        console.log("-----------------------------------------");
        console.log("---- LISTA DE EGRESOS DE CAJA ----");
        console.log("-----------------------------------------");
        console.dir(this.egresosArray, { depth: null, colors: true });
    }

    calcularTotalEgresos(): void {
        let total = 0;
        this.egresosArray.forEach(e => total += e.monto);
        console.log(`\n💸 Total de egresos/gastos registrados: $${total}`);
    }
}