import * as _ from 'lodash';
export function generateFormHtml(fields = false) {
    let emptyObj = {};
    let formTemplate = '';
    if(!fields) {
        return '';
    }
  
    Object.keys(fields).map((key, index) => {
        switch( fields[key] ) {
            case 'multilingualSchema':  emptyObj[key] = multilingual(key);
              break;
            case 'String':  emptyObj[key] = string(key);
              break;
            case 'Number':  emptyObj[key] = number(key);
              break;
            case 'imageSchema':  emptyObj[key] =  image(key);
              break;
            case 'Date':  emptyObj[key] = date(key);
              break;
            case '[imageSchema]':  emptyObj[key] = images(key);
              break;
        }
    });
    Object.keys(emptyObj).map((key, index) => {
        formTemplate += emptyObj[key];
    });
   
    return formTemplate;
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
        <h3>${key}</h3>
        <div class="inputs_container">
            <app-image-upload [image]="formData.${key}" (uploadComplete)="onUploadComplete${_.upperFirst(key)}($event)"></app-image-upload>
        </div>
      `;
}

function date(key) {
  return  ` 
        <div fxLayout="row" fxLayoutAlign="space-between">
            <mat-form-field appearance="outline" fxFlex="50">
            <mat-label>${key}</mat-label>
            <input matInput [matDatepicker]="startDatePicker" formControlName="${key}">
            <mat-datepicker-toggle matSuffix [for]="startDatePicker"></mat-datepicker-toggle>
            <mat-datepicker #startDatePicker></mat-datepicker>
            </mat-form-field>
        </div>
   `;
}

function images(key) {
    return  `
        <h3>${key}</h3>
        <div class="inputs_container">
            <app-images-upload *ngIf="images" [images]="images" (removeImage)="deleteImage${_.upperFirst(key)}($event)" (uploadComplete)="onUploadComplete${_.upperFirst(key)}($event)"></app-images-upload>
        </div>
  `;
}
