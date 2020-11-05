import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Module } from 'app/shared/models/module';
import { FormComponent as _FormComponent } from '../../../../../../shared/components/form.component';


@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss']
})
export class BasicInfoComponent extends _FormComponent implements OnInit {

  
  @Input() formData: Module;
  @Input() showSubmit = true;
  @Output() submitForm = new EventEmitter<Module>();


  moduleTypes = [
      'articles',
      'common',
  ];
  form: FormGroup;
  

  constructor(
    private fb: FormBuilder,
    
  ) {
    super();
  }

  ngOnInit(): void {

    
    this.formData.title = this.formData.title || '';
    this.formData.cmdTitle = this.formData.cmdTitle || '';
    this.formData.editPage = this.formData.editPage === undefined ? false : this.formData.editPage;

    this.form = this.fb.group({
        title: [this.formData.title || ''],
        cmdTitle: [this.formData.cmdTitle || ''],
        moduleType: [this.formData.moduleType || '', [Validators.required]],
        editPage: [this.formData.editPage],
    });
  }

  

  submit(): void {
    if (this.form.valid) {
      this.submitForm.emit(this.form.value);
    }
  }
}
