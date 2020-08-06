import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Compiuter } from 'app/shared/models/compiuter';
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
  @Output() submitForm = new EventEmitter<Compiuter>();

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
    this.formData.comments = this.formData.comments || '';
    this.formData.title = this.formData.title || {};
    this.formData.description = this.formData.description || {};

    this.form = this.fb.group({
      comments: [this.formData.comments || '', Validators.required],
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
    });
  }

  submit() {
    if (this.form.valid) {
      this.submitForm.emit(this.form.value);
    }
  }
}
