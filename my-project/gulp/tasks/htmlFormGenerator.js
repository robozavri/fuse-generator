import * as _ from 'lodash';
export function generateFormHtml(fields = false) {
    let emptyObj = {};
    let formTemplate = '';
    if(!fields) {
        return '';
    }
  
    Object.keys(fields).map((key, index) => {
        switch( fields[key] ) {
            case 'multilingual':  emptyObj[key] = multilingual(key);
              break;
            case 'string':  emptyObj[key] = string(key);
              break;
            case 'number':  emptyObj[key] = number(key);
              break;
            case 'image':  emptyObj[key] =  image(key);
              break;
            // case 'images':  emptyObj[key]  = [];
            //   break;
        }
    });
    Object.keys(emptyObj).map((key, index) => {
        formTemplate += emptyObj[key];
    });
   
    return formTemplate;
//     return ` 
// <form [formGroup]="form" (ngSubmit)="submit()">
//     <div class="tab-content p-24" fusePerfectScrollbar fxLayout="column">
//             ${formTemplate}
//     </div>
// </form>`;
}

function multilingual(key) {
  return  `
        <div fxLayout="row" fxLayoutAlign="space-between" formGroupName='${key}'>
            <mat-form-field appearance="outline" floatLabel="always" fxFlex="30">
                <mat-label> ${key} ge </mat-label>
                <input matInput placeholder="Title ge" formControlName="ge">
            </mat-form-field>

            <mat-form-field appearance="outline" floatLabel="always" fxFlex="30">
                <mat-label> ${key} en </mat-label>
                <input matInput placeholder="${key} en" formControlName="en">
            </mat-form-field>

            <mat-form-field appearance="outline" floatLabel="always" fxFlex="30">
                <mat-label> ${key} ru </mat-label>
                <input matInput placeholder="${key} ru" formControlName="ru">
            </mat-form-field>
        </div>
    `;
}

function string(key) {
  return  `
        <div fxLayout="row" fxLayoutAlign="space-between">
            <mat-form-field appearance="outline" floatLabel="always" fxFlex="50">
                <mat-label> ${key}</mat-label>
                <input matInput placeholder="${key}" formControlName="${key}">
            </mat-form-field>
        </div>
    `;
}

function number(key) {
  return  `
        <div fxLayout="row" fxLayoutAlign="space-between">
            <mat-form-field appearance="outline" floatLabel="always" fxFlex="20">
                <mat-label>${key}</mat-label>
                <input matInput type="number" min="0" formControlName="${key}">
            </mat-form-field>
        </div>
    `;
}


function image(key) {
    return  `
        <div class="inputs_container">
            <app-image-upload [image]="formData.${key}" (uploadComplete)="onUploadComplete${_.upperFirst(key)}($event)"></app-image-upload>
        </div>
      `;
  }