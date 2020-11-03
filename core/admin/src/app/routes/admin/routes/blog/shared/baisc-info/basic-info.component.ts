import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { Blog } from 'app/shared/models/blog';
import { FormComponent as _FormComponent } from '../../../../../../shared/components/form.component';
import { accounts } from 'app/shared/constants/socials';
    

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss']
})
export class BasicInfoComponent extends _FormComponent implements OnInit {

    
  @Input() categories: any;
   
  @Input() formData: Blog;
  @Input() showSubmit = true;
  @Output() submitForm = new EventEmitter<Blog>();


 
  form: FormGroup;
  
  get accounts(): any { return accounts; }

  get socials(): FormArray {
      return this.form.get('about.socialAccounts') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    
  ) {
    super();
  }

  ngOnInit(): void {

    
    this.formData.name = this.formData.name || '';
    this.formData.fullName = this.formData.fullName || '';
    this.formData.category = this.formData.category || [];
    this.formData.about = this.formData.about || {};
    this.formData.about.contact = this.formData.about.contact || {};
    this.formData.about.about = this.formData.about.about || {};
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

  submit(): void {
    if (this.form.valid) {
      this.submitForm.emit(this.form.value);
    }
  }
}
