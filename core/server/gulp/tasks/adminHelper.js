import { listFields } from './fields';
import * as _ from 'lodash';

export function generateListPropeties() {
    let template ='';
    let columns ='';
    if(!listFields) {
        return emptyObj;
    }

    Object.keys(listFields).map((key, index) => {
        columns += `'${key}', `;
        switch( listFields[key] ) {
            case 'multilingualSchema': template += listColumnHtmlMultilingual(key);
              break;
            case 'String': template += listColumnHtmlString(key);
              break;
        }
    });
    return {template: template, columns: columns};
  }
  
function listColumnHtmlMultilingual(key){
  return `
        <!-- ${key} Column -->
        <ng-container matColumnDef="${key}">
            <mat-header-cell *matHeaderCellDef #${key}Label>${_.upperFirst(key)}</mat-header-cell>
            <mat-cell *matCellDef="let item">
                <p class="text-truncate">{{item.${key}?.en}}</p>
            </mat-cell>
        </ng-container>
  `;
}

function listColumnHtmlString(key){
  return `
        <!-- ${key} Column -->
        <ng-container matColumnDef="${key}">
            <mat-header-cell *matHeaderCellDef #${key}Label>${_.upperFirst(key)}</mat-header-cell>
            <mat-cell *matCellDef="let item">
                <p class="text-truncate">{{item?.${key}}}</p>
            </mat-cell>
        </ng-container>
  `;
}