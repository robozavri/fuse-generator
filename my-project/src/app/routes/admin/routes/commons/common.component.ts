import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { FormComponent } from 'app/shared/components/form.component';
import { MetaApiService } from 'app/shared/http/meta-api.service';
import { FileApiService } from '../../../../shared/http/files-api.service';
import { CommonApiService } from '../../../../shared/http/common-api.service';
import { SnackBarService } from 'app/shared/services/snack-bar.service';

import { accounts } from 'app/shared/constants/socials';
    

@Component({
  selector: 'app-common',
  templateUrl: './common.component.html',
  styleUrls: ['./common.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CommonComponent implements OnInit {

  form: FormGroup;
  formData: any = {};
  
  public images = [];
  public items: FormArray;
    
  get accounts(): any { return accounts; }

  get socials(): FormArray {
      return this.form.get('about.socialAccounts') as FormArray;
  }

  
  constructor(
    
    private snackBarService: SnackBarService,
    private fb: FormBuilder,
    public api: CommonApiService,
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.api.getOne().subscribe((data: any) => {
      this.formData = data;
      this.loadData();
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
  
  loadData(): any {

    
    this.formData.name = this.formData.name || '';
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
    this.images = this.formData.about.behemoth.blackmetal.images || [];
    const socialObj = { account: '', link: ''};
    const socialArray = (this.formData.about.socialAccounts || [socialObj]).map((socialItem: any) => this.createSocials(socialItem));
    

    this.form = this.fb.group({
        name: [this.formData.name || ''],
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

  submit(): void {
    this.api.update({ ...this.FormData.value }).subscribe(
      () => this.snackBarService.open('Updated Successfully'),
      () => this.snackBarService.open('Update Failed'),
    );
  }

}
