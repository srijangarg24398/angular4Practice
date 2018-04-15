import {Pipe,PipeTransform} from '@angular/core';

@Pipe({
	name:"reverseString"
})
export class ReverseStringPipe implements PipeTransform {
	
	transform(value:any,...args:any[]){
		return value.split("").reverse().join("");
	}
}