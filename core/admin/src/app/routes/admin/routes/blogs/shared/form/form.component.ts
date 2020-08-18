import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Blog } from 'app/shared/models/blog';
import { FormComponent as _FormComponent } from '../../../../../../shared/components/form.component';
import { MatSnackBar } from '@angular/material';

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
  selectedImage: any;
  filesToCreate: any[] = [];
  filesToDestroy: any[] = [];
  
    public images = [];
    public items: FormArray;
    

  constructor(
    private fb: FormBuilder,
  ) {
    super();
  }

  ngOnInit(): void {
    
    this.formData.name = this.formData.name || '';
    this.formData.title = this.formData.title || {};
    this.formData.description = this.formData.description || {};
    this.formData.count = this.formData.count || '';
    this.formData.thumbnail = this.formData.thumbnail || {};
    this.images = this.formData.images || [];
    this.formData.createAt = this.formData.createAt || new Date();

    this.form = this.fb.group({
        
            name: [this.formData.name || ''],
            title: this.fb.group({
                    ge: [this.formData.title.ge || ''],
                    en: [this.formData.title.en || ''],
                    ru: [this.formData.title.ru || ''],
            }),
            description: this.fb.group({
                    ge: [this.formData.description.ge || ''],
                    en: [this.formData.description.en || ''],
                    ru: [this.formData.description.ru || ''],
            }),
            count: [this.formData.count || ''], 
            thumbnail: this.fb.group({
                url: [this.formData.thumbnail.url || '']
            }),
            images: this.fb.array(this.formData.images || []),
            createAt: [this.formData.createAt || new Date()],
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
   

  submit(): void {
    if (this.form.valid) {
      this.submitForm.emit(this.form.value);
    }
  }
}