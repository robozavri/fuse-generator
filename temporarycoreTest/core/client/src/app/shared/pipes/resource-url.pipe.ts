import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../environments/environment';

const RESOURCE_URL = environment.resourceNameSpace;

@Pipe({ name: 'resourceUrl' })
export class ResourceUrlPipe implements PipeTransform {

   transform(value: any): any {
      if (!value || value.startsWith('http://') || value.startsWith('https://')) return value;
      return RESOURCE_URL + '/' + value;
   }
}
