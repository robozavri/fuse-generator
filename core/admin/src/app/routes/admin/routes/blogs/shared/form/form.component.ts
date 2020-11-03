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
  
  public images827 = [];
  public items827: FormArray;
    
  public images871 = [];
  public items871: FormArray;
    
  public images547 = [];
  public items547: FormArray;
    
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
    this.images827 = this.formData.fotos || [];
    this.images871 = this.formData.images || [];
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
    this.images547 = this.formData.about.behemoth.blackmetal.images || [];
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

  
  onUploadCompleteThumbnail60(data: any): void {
      this.form.get('thumbnail').get('url').markAsTouched();
      this.form.get('thumbnail').get('url').setValue(data.url);
  }
     
  onUploadCompleteImage30(data: any): void {
      this.form.get('image').get('url').markAsTouched();
      this.form.get('image').get('url').setValue(data.url);
  }
     
  // fotos upload methods
  deleteImageFotos827(index: any): void {
     this.images827.splice(index, 1);
     this.items827 = this.form.get('fotos') as FormArray;
     this.items827.removeAt(index);
  }

  createItemFotos827(url= ''): FormGroup {
       return this.fb.group({
           url: url,
       });
  }

  addItemFotos827(url: any): void {
       this.items827 = this.form.get('fotos') as FormArray;
       this.items827.push(this.createItemFotos827(url));
       this.images827.push({ url: url });
  }

  onUploadCompleteFotos827(data: any): void {
       this.addItemFotos827(data.url);
  }
   
  // images upload methods
  deleteImageImages871(index: any): void {
     this.images871.splice(index, 1);
     this.items871 = this.form.get('images') as FormArray;
     this.items871.removeAt(index);
  }

  createItemImages871(url= ''): FormGroup {
       return this.fb.group({
           url: url,
       });
  }

  addItemImages871(url: any): void {
       this.items871 = this.form.get('images') as FormArray;
       this.items871.push(this.createItemImages871(url));
       this.images871.push({ url: url });
  }

  onUploadCompleteImages871(data: any): void {
       this.addItemImages871(data.url);
  }
   
  onUploadCompleteImage6(data: any): void {
      this.form.get('about.contact.image').get('url').markAsTouched();
      this.form.get('about.contact.image').get('url').setValue(data.url);
  }
     
  // images upload methods
  deleteImageImages547(index: any): void {
     this.images547.splice(index, 1);
     this.items547 = this.form.get('about.behemoth.blackmetal.images') as FormArray;
     this.items547.removeAt(index);
  }

  createItemImages547(url= ''): FormGroup {
       return this.fb.group({
           url: url,
       });
  }

  addItemImages547(url: any): void {
       this.items547 = this.form.get('about.behemoth.blackmetal.images') as FormArray;
       this.items547.push(this.createItemImages547(url));
       this.images547.push({ url: url });
  }

  onUploadCompleteImages547(data: any): void {
       this.addItemImages547(data.url);
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
