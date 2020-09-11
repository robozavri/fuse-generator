import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Blog } from 'app/shared/models/blog';
import { FormComponent as _FormComponent } from '../../../../../../shared/components/form.component';
import { MatSnackBar } from '@angular/material';
import { accounts } from 'app/shared/constants/socials';
    

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
  
  public images622 = [];
  public items622: FormArray;
    
  public images894 = [];
  public items894: FormArray;
    
  public images444 = [];
  public items444: FormArray;
    
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
    this.formData.thumbnail = this.formData.thumbnail || {};
    this.formData.image = this.formData.image || {};
    this.images622 = this.formData.fotos || [];
    this.images894 = this.formData.images || [];
    this.formData.about = this.formData.about || {};
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
    this.images444 = this.formData.about.behemoth.blackmetal.images || [];
    const socialObj = { account: '', link: ''};
    const socialArray = (this.formData.about.socialAccounts || [socialObj]).map((socialItem: any) => this.createSocials(socialItem));
    

    this.form = this.fb.group({ 
        name: [this.formData.name || ''],
        fullName: [this.formData.fullName || ''], 
        thumbnail: this.fb.group({
            url: [this.formData.thumbnail.url || '']
        }), 
        image: this.fb.group({
            url: [this.formData.image.url || '']
        }),
        fotos: this.fb.array(this.formData.fotos || []),
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

  
  onUploadCompleteThumbnail3(data: any): void {
      this.form.get('thumbnail').get('url').markAsTouched();
      this.form.get('thumbnail').get('url').setValue(data.url);
  }
     
  onUploadCompleteImage200(data: any): void {
      this.form.get('image').get('url').markAsTouched();
      this.form.get('image').get('url').setValue(data.url);
  }
     
  // fotos upload methods
  deleteImageFotos622(index: any): void {
     this.images622.splice(index, 1);
     this.items622 = this.form.get('fotos') as FormArray;
     this.items622.removeAt(index);
  }

  createItemFotos622(url= ''): FormGroup {
       return this.fb.group({
           url: url,
       });
  }

  addItemFotos622(url: any): void {
       this.items622 = this.form.get('fotos') as FormArray;
       this.items622.push(this.createItemFotos622(url));
       this.images622.push({ url: url });
  }

  onUploadCompleteFotos622(data: any): void {
       this.addItemFotos622(data.url);
  }
   
  // images upload methods
  deleteImageImages894(index: any): void {
     this.images894.splice(index, 1);
     this.items894 = this.form.get('images') as FormArray;
     this.items894.removeAt(index);
  }

  createItemImages894(url= ''): FormGroup {
       return this.fb.group({
           url: url,
       });
  }

  addItemImages894(url: any): void {
       this.items894 = this.form.get('images') as FormArray;
       this.items894.push(this.createItemImages894(url));
       this.images894.push({ url: url });
  }

  onUploadCompleteImages894(data: any): void {
       this.addItemImages894(data.url);
  }
   
  onUploadCompleteImage30(data: any): void {
      this.form.get('about.contact.image').get('url').markAsTouched();
      this.form.get('about.contact.image').get('url').setValue(data.url);
  }
     
  // images upload methods
  deleteImageImages444(index: any): void {
     this.images444.splice(index, 1);
     this.items444 = this.form.get('about.behemoth.blackmetal.images') as FormArray;
     this.items444.removeAt(index);
  }

  createItemImages444(url= ''): FormGroup {
       return this.fb.group({
           url: url,
       });
  }

  addItemImages444(url: any): void {
       this.items444 = this.form.get('about.behemoth.blackmetal.images') as FormArray;
       this.items444.push(this.createItemImages444(url));
       this.images444.push({ url: url });
  }

  onUploadCompleteImages444(data: any): void {
       this.addItemImages444(data.url);
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
