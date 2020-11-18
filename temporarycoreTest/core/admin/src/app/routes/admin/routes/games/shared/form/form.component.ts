import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { FormComponent as _FormComponent } from '../../../../../../shared/components/form.component';
import { Game } from 'app/shared/models/game';
import { largeSize } from 'app/shared/constants/image';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent extends _FormComponent implements OnInit {
  
  @Input() formData: Game;
  @Input() showSubmit = true;
  @Output() submitForm = new EventEmitter<Game>();

  form: FormGroup;
  imageSize = largeSize;
  

  constructor(
    private fb: FormBuilder,
  ) {
    super();
  }

  ngOnInit(): void {
  
      this.formData.firstLevelTestFieldTWO = this.formData.firstLevelTestFieldTWO || {};
      this.formData.firstLevelTestField = this.formData.firstLevelTestField || {};

    this.form = this.fb.group({ 
      firstLevelTestFieldTWO: this.fb.group({
          
        en: [this.formData.firstLevelTestFieldTWO.en || ''],
        ge: [this.formData.firstLevelTestFieldTWO.ge || ''],
        ru: [this.formData.firstLevelTestFieldTWO.ru || ''],
      }),
      firstLevelTestField: this.fb.group({
          
        en: [this.formData.firstLevelTestField.en || ''],
        ge: [this.formData.firstLevelTestField.ge || ''],
        ru: [this.formData.firstLevelTestField.ru || ''],
      }),
    });
  }
  
  submit(): void {
    if (this.form.valid) {
      this.submitForm.emit(this.form.value);
    }
  }
}
