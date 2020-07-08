import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Article } from 'app/shared/models/article';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormComponent } from 'app/shared/components/form.component';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss']
})
export class BasicInfoComponent extends FormComponent implements OnInit {
  @Input() formData: any;
  @Input() showSubmit: boolean = true;
  @Output() submitForm = new EventEmitter<Article>();

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
  ) {
    super();
  }

  ngOnInit() {
    this.loadForm();
  }

  loadForm() {
    this.formData.title = this.formData.title || {};
    this.formData.content = this.formData.content || {};
    this.formData.description = this.formData.description || {};
    this.formData.thumbnail = this.formData.thumbnail || {};

    this.form = this.fb.group({
      title: this.fb.group({
        ge: [this.formData.title.ge || '', Validators.required],
        en: [this.formData.title.en || '', Validators.required],
        ru: [this.formData.title.ru || '', Validators.required],
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

  submit() {
    if (this.form.valid) {
      this.submitForm.emit(this.form.value);
    }
  }
}
