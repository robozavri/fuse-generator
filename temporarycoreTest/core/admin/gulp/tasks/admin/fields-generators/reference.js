import * as _ from 'lodash';
import { plural, firstLC, firstUC, singular } from '../../../helpers';

export class ReferenceField {

  constructor(FieldsHelper, refFields) {
    this.FieldsHelper = FieldsHelper;
    this.refFields = refFields;
  }
    
  builder(key, nested = null) {
    const selectType = this.refFields[key].referenceType === 'single' ? "''" : '[]';
      return {
          formComponentClassOnInitBodyArea: this.FieldsHelper.buildCheckFormElementEmpty(key, nested,selectType),
          emptyObjectsForOpenModal:  this.buildForModalEmptyObj(key),
          formComponentFormGroupArea: this.buildFormGroup(key, nested),
          formComponentHtmlArea: this.buildHtml(key),
          
          formComponentClassInputArea: this.generateInputs(key),

          modalImportsArea: this.generateImport(key),
          modalComponentClassPropertiesArea: this.generateClassProperties(key),
          modalComponentClassConstructorArgumentsArea: this.generateConstructorArgument(key),
          modalComponentClassOnInitBodyArea: this.generateApiCall(key),

          formComponentBindParams: this.generateBindParams(key),

          listImportsArea: this.generateImport(key),
          listComponentClassOnInitBodyArea: this.generateApiCall(key),
          listComponentClassPropertiesArea: this.generateClassProperties(key),
          listComponentClassConstructorArgumentsArea: this.generateConstructorArgument(key),

          editPageComponentImportsArea: this.generateImport(key),
          editPageComponentClassPropertiesArea: this.generateClassProperties(key),
          editPageComponentClassConstructorArgumentsArea: this.generateConstructorArgument(key),
          editPageComponentClassOnInitBodyArea: this.generateApiCall(key),
      }
  }


  buildForModalEmptyObj(key) {
    if (this.refFields[key].referenceType === 'single') {
          return  `
          ${key}: '',`;
    }
    return  `
          ${key}: [],`;   
  }

  buildFormGroup(key, nested = null) {
    if (nested === null) {
        nested = key;
    }else{
        nested += key;
    }
    if (this.refFields[key].referenceType === 'single') {
      return   `
        ${key}: [this.formData.${nested} || ''],`;
  }

      return   `
        ${key}: [this.formData.${nested} || []],`;  
  }

  buildHtml(key) {
    const pluralName = plural(key);
    const multiple = this.refFields[key].referenceType === 'multiple' ? 'multiple': '';

    return `
        <mat-form-field [style.width.px]=500 *ngIf="${pluralName}">
            <mat-label>${_.kebabCase(key)}</mat-label>
            <mat-select formControlName="${key}" ${multiple}>
                <mat-option *ngFor="let item of ${pluralName}" [value]="item.${this.refFields[key].value}">{{ item.${this.refFields[key].displayFieldName} }}</mat-option>
            </mat-select>
        </mat-form-field>
  `;
  }


  generateInputs(key) {
    return  `  
    @Input() ${ plural(key) }: any;
    `
  }

  generateBindParams(key) {
    return  ` [${ plural(key) }]="${ plural(key) }" `;
  }

  generateImport(key) {
    return `
  import { ${ firstUC(singular( this.refFields[key].reference )) }ApiService } from 'app/shared/http/${_.kebabCase(singular( this.refFields[key].reference ))}-api.service';
  `;
  }

  generateClassProperties(key) {
    return  `  
    ${ plural(key) }: any;
    `
  }

  generateConstructorArgument(key) {
        return  `
      private ${ firstLC(singular( this.refFields[key].reference  )) }ApiService: ${ firstUC(singular( this.refFields[key].reference  )) }ApiService,
        `;
  }

  generateApiCall(key) {
    return  `
      this.${ firstLC(singular( this.refFields[key].reference  )) }ApiService.getByQuery({all: true}).subscribe((data: any) => {
          this.${ plural(key) } = data.items;
      });
    `;
  }
}