import { listFields, availableLangs } from './fields';
import * as _ from 'lodash';
import { firstUC, firstLC, plural, singular} from '../helpers';

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
                <p class="text-truncate">{{item.${key}?.${availableLangs[0]}}}</p>
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


export function genrateRefernce(fields, refFields) {
  let obj = {
    imports: '',
    inputs: '',
    classProperties: '',
    constructorArtuments: '',
    onInitBody: '',
  };
  
  if(!fields) {
      return obj;
  }

  Object.keys(fields).map((key, index) => {
      if (fields[key] === 'Reference' ) {
          obj.imports = generateImport(key, refFields);
          obj.inputs = generateInputs(key, refFields);
          obj.classProperties = generateClassProperties(key, refFields);
          obj.constructorArtuments = generateConstructorArgument(key, refFields);
          obj.onInitBody = generateApiCall(key, refFields);
          obj.componentBindParams = generateBindParams(key, refFields);
      }
  });
  return obj;
}

function generateInputs(key, refFields) {
  return  `  
  @Input() ${ plural(key) }: any;
   `
}

function generateBindParams(key, refFields) {
  return  ` [${ plural(key) }]="${ plural(key) }" `;
}

function generateImport(key, refFields) {
  return `
import { ${ firstUC(singular( refFields[key].reference )) }ApiService } from 'app/shared/http/${_.kebabCase(singular( refFields[key].reference ))}-api.service';`;
}

function generateClassProperties(key, refFields) {
   return  `  
  ${ plural(key) }: any;
   `
}

function generateConstructorArgument(key, refFields) {
      return  `
    private ${ firstLC(singular( refFields[key].reference  )) }ApiService: ${ firstUC(singular( refFields[key].reference  )) }ApiService,
      `;
}

function generateApiCall(key, refFields) {
  return  `
    this.${ firstLC(singular( refFields[key].reference  )) }ApiService.getByQuery({all: true}).subscribe((data: any) => {
        this.${ plural(key) } = data.items;
    });
  `;
}