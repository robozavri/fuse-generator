import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { CommonsTextApiService } from '../../../../shared/http/commons-text-api.service';
import { SnackBarService } from 'app/shared/services/snack-bar.service';

import { accounts } from 'app/shared/constants/socials';
    

@Component({
  selector: 'app-commons-text',
  templateUrl: './commons-text.component.html',
  styleUrls: ['./commons-text.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CommonsTextComponent implements OnInit {

  form: FormGroup;
  formData: any = {};
  
  get accounts(): any { return accounts; }

  get socials(): FormArray {
      return this.form.get('about.socialAccounts') as FormArray;
  }
   
  constructor(
    
    private snackBarService: SnackBarService,
    private fb: FormBuilder,
    public api: CommonsTextApiService,
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.api.getOne().subscribe((data: any) => {
      this.formData = data;
      this.loadData();
    });
  }

  
  // socialAccounts methods
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
  }
  
  loadData(): any {

    
    this.formData.name = this.formData.name || '';
    this.formData.fullName = this.formData.fullName || '';
    this.formData.category = this.formData.category || [];
    this.formData.about = this.formData.about || {};
    this.formData.about.contact = this.formData.about.contact || {};
    this.formData.about.contact.title = this.formData.about.contact.title || {};
    this.formData.about.contact.address = this.formData.about.contact.address || {};
    this.formData.about.phone = this.formData.about.phone || '';
    const socialObj = { account: '', link: ''};
    const socialArray = (this.formData.about.socialAccounts || [socialObj]).map((socialItem: any) => this.createSocials(socialItem));
    

    this.form = this.fb.group({
        name: [this.formData.name || ''],
        fullName: [this.formData.fullName || ''],
        category: [this.formData.category || []],
    about: this.fb.group({
    
    contact: this.fb.group({
    
        title: this.fb.group({
            
           en: [this.formData.about.contact.title.en || ''],
           ge: [this.formData.about.contact.title.ge || ''],
        }),
        address: this.fb.group({
            
           en: [this.formData.about.contact.address.en || ''],
           ge: [this.formData.about.contact.address.ge || ''],
        }),
    }),
        phone: [this.formData.about.phone || ''],
        socialAccounts: this.fb.array( socialArray ),
    }),
    });
  
  }

  submit(): void {
    this.api.update({ ...this.form.value }).subscribe(
      () => this.snackBarService.open('Updated Successfully'),
      () => this.snackBarService.open('Update Failed'),
    );
  }

}
