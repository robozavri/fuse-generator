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

  
  @Input() formData: Blog;
  @Input() showSubmit = true;
  @Output() submitForm = new EventEmitter<Blog>();


 
  form: FormGroup;
  
  public images88 = [];
  public items88: FormArray;
    
  public images44 = [];
  public items44: FormArray;
    
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
    this.images88 = this.formData.images || [];
    this.formData.about = this.formData.about || {};
    this.formData.about.contact = this.formData.about.contact || {};
    this.formData.about.contact.street = this.formData.about.contact.street || {};
    this.formData.about.contact.street.peoples = this.formData.about.contact.street.peoples || {};
    this.formData.about.contact.street.peoples.human = this.formData.about.contact.street.peoples.human || {};
    this.formData.about.behemoth = this.formData.about.behemoth || {};
    this.formData.about.behemoth.songs = this.formData.about.behemoth.songs || {};
    this.formData.about.behemoth.blackmetal = this.formData.about.behemoth.blackmetal || {};
    this.formData.about.about = this.formData.about.about || {};
    this.formData.about.contact = this.formData.about.contact || {};
    this.formData.about.contact.street = this.formData.about.contact.street || {};
    this.formData.about.contact.street.peoples = this.formData.about.contact.street.peoples || {};
    this.formData.about.contact.street.peoples.human = this.formData.about.contact.street.peoples.human || {};
    this.formData.about.behemoth = this.formData.about.behemoth || {};
    this.formData.about.behemoth.songs = this.formData.about.behemoth.songs || {};
    this.formData.about.behemoth.blackmetal = this.formData.about.behemoth.blackmetal || {};
    this.formData.about.contact.street.title = this.formData.about.contact.street.title || '';
    this.formData.about.contact.street.peoples.human.age = this.formData.about.contact.street.peoples.human.age || {};
    this.formData.about.contact.street.peoples.human.age4 = this.formData.about.contact.street.peoples.human.age4 || '';
    this.formData.about.contact.street.peoples.isFeatured = this.formData.about.contact.street.peoples.isFeatured === undefined ? false : this.formData.about.contact.street.peoples.isFeatured;
    this.formData.about.contact.street.desc = this.formData.about.contact.street.desc || '';
    this.formData.about.contact.image = this.formData.about.contact.image || {};
    this.formData.about.behemoth.ambum = this.formData.about.behemoth.ambum || '';
    this.formData.about.behemoth.songs.oneSong = this.formData.about.behemoth.songs.oneSong || {};
    this.formData.about.behemoth.songs.oneSong2 = this.formData.about.behemoth.songs.oneSong2 || {};
    this.images44 = this.formData.about.behemoth.blackmetal.images || [];
    const socialObj = { account: '', link: ''};
    const socialArray = (this.formData.about.socialAccounts || [socialObj]).map((socialItem: any) => this.createSocials(socialItem));
    

    this.form = this.fb.group({
        name: [this.formData.name || ''],
        fullName: [this.formData.fullName || ''],
        images: this.fb.array(this.formData.images || []),
    about: this.fb.group({
    
    contact: this.fb.group({
    
    street: this.fb.group({
    
        title: [this.formData.about.contact.street.title || ''],
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

  
  // images upload methods
  deleteImageImages88(index: any): void {
     this.images88.splice(index, 1);
     this.items88 = this.form.get('images') as FormArray;
     this.items88.removeAt(index);
  }

  createItemImages88(url= ''): FormGroup {
       return this.fb.group({
           url: url,
       });
  }

  addItemImages88(url: any): void {
       this.items88 = this.form.get('images') as FormArray;
       this.items88.push(this.createItemImages88(url));
       this.images88.push({ url: url });
  }

  onUploadCompleteImages88(data: any): void {
       this.addItemImages88(data.url);
  }
   
  onUploadCompleteImage(data: any): void {
      this.form.get('about.contact.image').get('url').markAsTouched();
      this.form.get('about.contact.image').get('url').setValue(data.url);
  }
     
  // images upload methods
  deleteImageImages44(index: any): void {
     this.images44.splice(index, 1);
     this.items44 = this.form.get('about.behemoth.blackmetal.images') as FormArray;
     this.items44.removeAt(index);
  }

  createItemImages44(url= ''): FormGroup {
       return this.fb.group({
           url: url,
       });
  }

  addItemImages44(url: any): void {
       this.items44 = this.form.get('about.behemoth.blackmetal.images') as FormArray;
       this.items44.push(this.createItemImages44(url));
       this.images44.push({ url: url });
  }

  onUploadCompleteImages44(data: any): void {
       this.addItemImages44(data.url);
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
