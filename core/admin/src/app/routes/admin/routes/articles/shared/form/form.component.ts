import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Article } from 'app/shared/models/article';
import { FormComponent as _FormComponent } from '../../../../../../shared/components/form.component';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent extends _FormComponent implements OnInit {

  @Input() formData: Article;
  @Input() showSubmit: boolean = true;
  @Output() submitForm = new EventEmitter<Article>();


  form: FormGroup;
  selectedImage: any;
  filesToCreate: any[] = [];
  filesToDestroy: any[] = [];

  constructor(
    private fb: FormBuilder,
  ) {
    super();
  }

  ngOnInit() {
    this.formData.title = this.formData.title || {};
    this.formData.content = this.formData.content || {};
    this.formData.description = this.formData.description || {};
    this.formData.thumbnail = this.formData.thumbnail || {};

    this.form = this.fb.group({
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
      content: this.fb.group({
        ge: [this.formData.content.ge || ''],
        en: [this.formData.content.en || ''],
        ru: [this.formData.content.ru || ''],
      }),
      thumbnail: this.fb.group({
        url: [this.formData.thumbnail.url || '']
      }),
    });
  }

  onUploadComplete(data) {
    this.form.get('thumbnail').get('url').markAsTouched();
    this.form.get('thumbnail').get('url').setValue(data.url);
  }

  submit() {
    if (this.form.valid) {
      this.submitForm.emit(this.form.value);
    }
  }
}
