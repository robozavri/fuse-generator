import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Category } from 'app/shared/models/category';
import { FormComponent as _FormComponent } from '../../../../../../shared/components/form.component';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent extends _FormComponent implements OnInit {

  @Input() formData: Category;
  @Input() showSubmit = true;
  @Output() submitForm = new EventEmitter<Category>();


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

    this.form = this.fb.group({
        
            name: [this.formData.name || ''],
    });
    
  }

  

  

  submit(): void {
    if (this.form.valid) {
      this.submitForm.emit(this.form.value);
    }
  }
}
