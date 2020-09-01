import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { Blog } from 'app/shared/models/blog';
import { FormComponent as _FormComponent } from '../../../../../../shared/components/form.component';
import { accounts } from '../../../../../../shared/constants/socials';
    

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
  
  public images = [];
  public items: FormArray;
    
  get accounts(): any { return accounts; }

  get socials(): FormArray {
      return this.form.get('socialAccounts') as FormArray;
  }
    
  blogTypes = ['metal', 'rock', 'classic', 'black', ];

  constructor(
    private fb: FormBuilder,
    
  ) {
    super();
  }

  ngOnInit(): void {

    
    this.formData.name = this.formData.name || '';
    this.formData.title = this.formData.title || {};
    this.formData.description = this.formData.description || {};
    this.formData.smallDescription = this.formData.smallDescription || {};
    this.formData.content = this.formData.content || {};
    this.formData.aboutQuili = this.formData.aboutQuili || '';
    this.formData.aboutPrimitive = this.formData.aboutPrimitive || '';
    this.formData.count = this.formData.count || '';
    this.formData.thumbnail = this.formData.thumbnail || {};
    this.formData.images = this.formData.images || [];
    this.formData.createAt = this.formData.createAt || '';
    const socialObj = { account: '', link: ''};
    const socialArray = (this.formData.socialAccounts || [socialObj]).map((socialItem: any) => this.createSocials(socialItem));
    
    this.formData.category = this.formData.category || [];
    this.formData.blogType = this.formData.blogType || '';
    this.formData.isFeatured = this.formData.isFeatured === undefined ? false : this.formData.isFeatured;

    this.form = this.fb.group({
        name: [this.formData.name || ''],
        title: this.fb.group({
            
           en: [this.formData.title.en || ''],
           ge: [this.formData.title.ge || ''],
        }),
        description: this.fb.group({
            
           en: [this.formData.description.en || ''],
           ge: [this.formData.description.ge || ''],
        }),
        smallDescription: this.fb.group({
            
           en: [this.formData.smallDescription.en || ''],
           ge: [this.formData.smallDescription.ge || ''],
        }),
        content: this.fb.group({
            
           en: [this.formData.content.en || ''],
           ge: [this.formData.content.ge || ''],
        }),
        aboutQuili: [this.formData.aboutQuili || ''],
        aboutPrimitive: [this.formData.aboutPrimitive || ''],
        count: [this.formData.count || ''], 
        thumbnail: this.fb.group({
            url: [this.formData.thumbnail.url || '']
        }),
        images: this.fb.array(this.formData.images || []),
        createAt: [this.formData.createAt || new Date()],
        socialAccounts: this.fb.array( socialArray ),
        category: [this.formData.category || []],
        blogType: [this.formData.blogType || ''],
        isFeatured: [this.formData.isFeatured],
    });
  }

  
  onUploadCompleteThumbnail(data: any): void {
      this.form.get('thumbnail').get('url').markAsTouched();
      this.form.get('thumbnail').get('url').setValue(data.url);
  }
     
  // images upload methods
  deleteImageImages(index: any): void {
     this.images.splice(index, 1);
     this.items = this.form.get('images') as FormArray;
     this.items.removeAt(index);
  }

  createItemImages(url= ''): FormGroup {
       return this.fb.group({
           url: url,
       });
  }

  addItemImages(url: any): void {
       this.items = this.form.get('images') as FormArray;
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
