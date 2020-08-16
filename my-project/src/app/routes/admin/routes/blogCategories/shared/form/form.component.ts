import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BlogCategory } from 'app/shared/models/blog-category';
import { FormComponent as _FormComponent } from '../../../../../../shared/components/form.component';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent extends _FormComponent implements OnInit {

  @Input() formData: BlogCategory;
  @Input() showSubmit = true;
  @Output() submitForm = new EventEmitter<BlogCategory>();


  form: FormGroup;
  selectedImage: any;
  filesToCreate: any[] = [];
  filesToDestroy: any[] = [];

  constructor(
    private fb: FormBuilder,
  ) {
    super();
  }

  ngOnInit(): void {
    this.formData.title = this.formData.title || {};
    this.formData.description = this.formData.description || {};
    this.formData.thumbnail = this.formData.thumbnail || {};

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
            foto: this.fb.group({
                url: [this.formData.foto.url || '']
            }),
    });
    
  }

  
  onUploadCompleteThumbnail(data: any): void {
      this.form.get('thumbnail').get('url').markAsTouched();
      this.form.get('thumbnail').get('url').setValue(data.url);
  }

  onUploadCompleteFoto(data: any): void {
      this.form.get('foto').get('url').markAsTouched();
      this.form.get('foto').get('url').setValue(data.url);
  }


  submit(): void {
    if (this.form.valid) {
      this.submitForm.emit(this.form.value);
    }
  }
}
