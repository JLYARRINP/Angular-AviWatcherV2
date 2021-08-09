import { Pipe, PipeTransform } from '@angular/core';
import { Solicitud } from 'src/app/domain/entities/Solicitud';
@Pipe({
    name: 'PipeFilterStatus',
    pure: false
})
export class Pipefilterstatus implements PipeTransform {

    transform(solicitudes: Solicitud[], value: string) {
        if (!solicitudes || !value) {
            return solicitudes;
        }
        return solicitudes.filter(itemSol =>
            itemSol.status.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
}