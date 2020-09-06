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

    
  @Input() categories: any;
   
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
  
  
    this.formData.name = this.formData.name || '';
    this.formData.about.contact.category = this.formData.about.contact.category || [];
    this.formData.about.contact.street.title = this.formData.about.contact.street.title || '';
    this.formData.about.contact.street.blogType = this.formData.about.contact.street.blogType || '';
    this.formData.about.contact.street.peoples.human.age = this.formData.about.contact.street.peoples.human.age || {};
    this.formData.about.contact.street.peoples.human.age4 = this.formData.about.contact.street.peoples.human.age4 || '';
    this.formData.about.contact.street.peoples.isFeatured = this.formData.about.contact.street.peoples.isFeatured === undefined ? false : this.formData.about.contact.street.peoples.isFeatured;
    this.formData.about.contact.street.desc = this.formData.about.contact.street.desc || '';
    this.formData.about.contact.image = this.formData.about.contact.image || {};
    this.formData.about.behemoth.ambum = this.formData.about.behemoth.ambum || '';
    this.formData.about.behemoth.songs.oneSong = this.formData.about.behemoth.songs.oneSong || {};
    this.formData.about.behemoth.songs.oneSong2 = this.formData.about.behemoth.songs.oneSong2 || {};
    this.images = this.formData.about.behemoth.blackmetal.images || [];
    const socialObj = { account: '', link: ''};
    const socialArray = (this.formData.about.socialAccounts || [socialObj]).map((socialItem: any) => this.createSocials(socialItem));
    

    this.form = this.fb.group({ 
        name: [this.formData.name || ''],
    about: this.fb.group({
    
    contact: this.fb.group({
    
        category: [this.formData.about.contact.category || []],
    street: this.fb.group({
    
        title: [this.formData.about.contact.street.title || ''],
        blogType: [this.formData.about.contact.street.blogType || ''],
    peoples: this.fb.group({
    
    human: this.fb.group({
    
        age: this.fb.group({
            
           en: [this.formData.about.contact.street.peoples.human.age.en || ''],
           ge: [this.formData.about.contact.street.peoples.human.age.ge || ''],
        }),
        age4: [this.formData.about.contact.street.peoples.human.age4 || ''], 
    }),
        isFeatured: [this.formData.about.contact.street.peoples.isFeatured], 
    }),
        desc: [this.formData.about.contact.street.desc || ''], 
    }), 
        image: this.fb.group({
            url: [this.formData.about.contact.image.url || '']
        }), 
    }),
    behemoth: this.fb.group({
    
        ambum: [this.formData.about.behemoth.ambum || ''],
    songs: this.fb.group({
    
        oneSong: this.fb.group({
            
           en: [this.formData.about.behemoth.songs.oneSong.en || ''],
           ge: [this.formData.about.behemoth.songs.oneSong.ge || ''],
        }),
        oneSong2: this.fb.group({
            
           en: [this.formData.about.behemoth.songs.oneSong2.en || ''],
           ge: [this.formData.about.behemoth.songs.oneSong2.ge || ''],
        }), 
    }),
    blackmetal: this.fb.group({
    
        images: this.fb.array(this.formData.about.behemoth.blackmetal.images || []), 
    }), 
    }),
        socialAccounts: this.fb.array( socialArray ), 
    }),
    });
  }

  
  onUploadCompleteImage(data: any): void {
      this.form.get('about.contact.image').get('url').markAsTouched();
      this.form.get('about.contact.image').get('url').setValue(data.url);
  }
     
  // images upload methods
  deleteImageImages(index: any): void {
     this.images.splice(index, 1);
     this.items = this.form.get('about.behemoth.blackmetal.images') as FormArray;
     this.items.removeAt(index);
  }

  createItemImages(url= ''): FormGroup {
       return this.fb.group({
           url: url,
       });
  }

  addItemImages(url: any): void {
       this.items = this.form.get('about.behemoth.blackmetal.images') as FormArray;
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
