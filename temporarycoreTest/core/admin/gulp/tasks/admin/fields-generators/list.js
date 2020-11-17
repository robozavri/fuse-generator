import * as _ from 'lodash';
import { 
} from '../fields-helper';
import { availableLangs, listFields } from '../../fields';

export function buildListColumns() {
  return {
    listHtmlColumnsArea: generateListHtmlColumns(listFields),
    listComponentClassPropertiesArea: buildColumns(listFields)
  }
}

function buildColumns(listFields) {
  if(!listFields) return '';
  let columns ='';
  Object.keys(listFields).map((key) => {
    columns += `'${key}', `;
  });
  return `
  displayedColumns = ['id', ${columns}'active'];`;
}

function generateListHtmlColumns(listFields) {
  if(!listFields) return '';

  let template ='';
  Object.keys(listFields).map((key) => {
    switch( listFields[key] ) {
      case 'multilingualSchema': template += listColumnHtmlMultilingual(key);
        break;
      case 'String': template += listColumnHtmlString(key);
        break;
    }
  });
  return template;
}
  
  
function listColumnHtmlMultilingual(key) {
  return `
    <!-- ${key} column -->
    <ng-container matColumnDef="${key}">
      <mat-header-cell *matHeaderCellDef #${key}Label> ${_.upperFirst(key)} </mat-header-cell>
      <mat-cell *matCellDef="let item">
        <p class="text-truncate">{{item.${key}?.${availableLangs[0]}}}</p>
      </mat-cell>
    </ng-container>

`;
}
  
function listColumnHtmlString(key) {
  return `
    <!-- ${key} column -->
    <ng-container matColumnDef="${key}">
      <mat-header-cell *matHeaderCellDef #${key}Label> ${_.upperFirst(key)} </mat-header-cell>
      <mat-cell *matCellDef="let item">
        <p class="text-truncate">{{item?.${key}}}</p>
      </mat-cell>
    </ng-container>

`;
}
  