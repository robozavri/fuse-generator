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
            case 'Socials':  emptyObj[key] = socials(key);
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

function socials(key){
    return `
        <h1>Socials</h1>
        <div formArrayName="${key}">
            <mat-card *ngFor="let item of socials.controls; let i = index;" style="margin-bottom: 20px;">
                <h2>Account {{i + 1}}</h2>
                <div [formGroupName]="i" style="margin: 20px">
                    <div fxLayout="column" fxLayoutAlign="">

                        <mat-form-field  [style.width.px]=300 >
                            <mat-label>Account</mat-label>
                            <mat-select  formControlName="account">
                                <mat-option *ngFor="let account of accounts" [value]="account">{{ account }}</mat-option>
                            </mat-select>
                        </mat-form-field>

                        <mat-form-field appearance="outline" floatLabel="always" fxFlex="40">
                            <mat-label> link </mat-label>
                            <input matInput placeholder="link" name="link" formControlName="link">
                        </mat-form-field>
                    </div>
                    <button type="button" mat-raised-button color="warn" (click)="deleteSocials(i)">
                        <mat-icon>delete</mat-icon>
                    </button>
                </div>
            </mat-card>
            <button type="button" mat-raised-button color="accent" (click)="addSocials('socials')"
                    style="margin-bottom: 30px;">
                <mat-icon>add</mat-icon>
            </button>
        </div>

    `;
}
