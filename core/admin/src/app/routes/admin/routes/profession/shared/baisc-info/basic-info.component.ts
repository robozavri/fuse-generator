import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { Profession } from 'app/shared/models/profession';
import { FormComponent as _FormComponent } from '../../../../../../shared/components/form.component';


@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss']
})
export class BasicInfoComponent extends _FormComponent implements OnInit {

  
  @Input() formData: Profession;
  @Input() showSubmit = true;
  @Output() submitForm = new EventEmitter<Profession>();


 
  form: FormGroup;
  

  constructor(
    private fb: FormBuilder,
    
  ) {
    super();
  }

  ngOnInit(): void {

    
    this.formData.title = this.formData.title || '';
    this.formData.fullname = this.formData.fullname || '';
    this.formData.description = this.formData.description || '';
    this.formData.comment = this.formData.comment || '';

    this.form = this.fb.group({
        title: [this.formData.title || ''],
        fullname: [this.formData.fullname || ''],
        description: [this.formData.description || ''],
        comment: [this.formData.comment || ''],
    });
  }

  

  submit(): void {
    if (this.form.valid) {
      this.submitForm.emit(this.form.value);
    }
  }
}
