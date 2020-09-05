import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Blog } from 'app/shared/models/blog';
import { FormComponent as _FormComponent } from '../../../../../../shared/components/form.component';
import { MatSnackBar } from '@angular/material';
import { accounts } from '../../../../../../shared/constants/socials';
    

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent extends _FormComponent implements OnInit {

  
  @Input() formData: Blog;
  @Input() showSubmit = true;
  @Output() submitForm = new EventEmitter<Blog>();


  form: FormGroup;
  
    
  blogTypes = ['metal', 'rock', 'classic', 'black', ];
  public images = [];
  public items: FormArray;
    
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
  
  
    this.formData.about.contact.street.title = this.formData.about.contact.street.title || '';
    this.formData.blogType = this.formData.blogType || '';
    this.formData.about.contact.street.peoples.human.age = this.formData.about.contact.street.peoples.human.age || {};
    this.formData.about.contact.street.peoples.human.age4 = this.formData.about.contact.street.peoples.human.age4 || {};
    this.formData.about.contact.street.peoples.anumal.age2 = this.formData.about.contact.street.peoples.anumal.age2 || {};
    this.formData.about.contact.street.peoples.anumal.age3 = this.formData.about.contact.street.peoples.anumal.age3 || {};
    this.formData.about.contact.images = this.formData.about.contact.images || [];
    const socialObj = { account: '', link: ''};
    const socialArray = (this.formData.about.socialAccounts || [socialObj]).map((socialItem: any) => this.createSocials(socialItem));
    

    this.form = this.fb.group({ 
      about: this.fb.group({
      
      contact: this.fb.group({
      
      street: this.fb.group({
      
        title: [this.formData.title || ''],
        blogType: [this.formData.blogType || ''],
      peoples: this.fb.group({
      
      human: this.fb.group({
      
        age: this.fb.group({
            
           en: [this.formData.age.en || ''],
           ge: [this.formData.age.ge || ''],
        }),
        age4: this.fb.group({
            
           en: [this.formData.age4.en || ''],
           ge: [this.formData.age4.ge || ''],
        }), 
      }),
      anumal: this.fb.group({
      
        age2: this.fb.group({
            
           en: [this.formData.age2.en || ''],
           ge: [this.formData.age2.ge || ''],
        }),
        age3: this.fb.group({
            
           en: [this.formData.age3.en || ''],
           ge: [this.formData.age3.ge || ''],
        }), 
      }), 
      }), 
      }),
        images: this.fb.array(this.formData.images || []), 
      }),
        socialAccounts: this.fb.array( socialArray ), 
      }),
    });
  }

  
  // images upload methods
  deleteImageImages(index: any): void {
     this.images.splice(index, 1);
     this.items = this.form.get('about.contact.images') as FormArray;
     this.items.removeAt(index);
  }

  createItemImages(url= ''): FormGroup {
       return this.fb.group({
           url: url,
       });
  }

  addItemImages(url: any): void {
       this.items = this.form.get('about.contact.images') as FormArray;
       this.items.push(this.createItemImages(url));
       this.images.push({ url: url });
  }

  onUploadCompleteImages(data: any): void {
       this.addItemImages(data.url);
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
