import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    standalone: true,
    name: 'numberRound'
})
export class NumberRoundPipe implements PipeTransform {
    transform(value: number): number {
        console.log(value, 'value', Math.round(value));
        return Math.round(value);
    }
}