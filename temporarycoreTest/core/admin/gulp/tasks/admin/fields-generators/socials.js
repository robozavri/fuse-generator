import * as _ from 'lodash';


export class SocialsField {

  constructor(FieldsHelper) {
    this.FieldsHelper = FieldsHelper;
  }

  builder(key, nested = null) {
    return {
      formComponentClassOnInitBodyArea: this.generateFormEmptyObject(key, nested),
      emptyObjectsForOpenModal:  this.FieldsHelper.buildForModalEmpty(key,"[]"),
      formComponentFormGroupArea: this.buildFormGroup(key),
      formComponentHtmlArea: this.buildHtml(key),
      formComponentImporArea: this.importsForSocials(),
      formComponentClassPropertiesArea: this.getterForSocials(key, nested),
      formComponentClassBodyArea: this.generateSocialMethods(key)
    }
  }

  buildFormGroup(key) {
    return `
      ${key}: this.fb.array(socialArray),`; 
  }

  buildHtml(key) {
    return `
      <h2>${_.kebabCase(key)}</h2>
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

  importsForSocials(){
    return `import { accounts } from 'app/shared/constants/socials';`;
  }

  generateSocialMethods(key){
    return `
    // ${key} methods
    createSocials(data: any): FormGroup {
      return this.fb.group({
        account: [ data.account || ''],
        link: [ data.link || ''],
      });
    }
    
    addSocials(details: string): void {
      const detailsForm = this.fb.group({
        account: [''],
        link: [''],
      });
      this[details].push(detailsForm);
    }

    deleteSocials(i: any): void{
      this.socials.removeAt(i);
    }`;
  }

  getterForSocials(key, nested){
    if (nested === null) {
      nested = key;
    } else {
      nested += key;
    }
    return `
    get accounts(): any { return accounts; }

    get socials(): FormArray {
        return this.form.get('${nested}') as FormArray;
    }`;
  }

  generateFormEmptyObject(key, nested){
    if (nested === null) {
      nested = key;
    } else {
      nested += key;
    }
    return  `
      const socialObj = { account: '', link: ''};
      const socialArray = (this.formData.${nested} || [socialObj]).map((socialItem: any) => this.createSocials(socialItem));
  `;
  }
}