import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { FormComponent } from 'app/shared/components/form.component';
import { Field } from 'app/shared/models/field';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import * as _ from 'lodash';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss']
})

export class BasicInfoComponent extends FormComponent implements OnInit {


  @Input() formData: any;
  @Input() modules: any;
  @Input() fields: any;
  @Input() showSubmit = true;
  @Output() submitForm = new EventEmitter<Field>();

  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes = [ENTER, COMMA];
  fieldType: any;

  fieldTypes = [
    'String',
    'Number',
    'Date',
    'multilingualSchema',
    'imageSchema',
    '[imageSchema]',
    'Socials',
    'multilingualSchema-Textarea',
    'multilingualSchema-quill-editor',
    'quill-editor',
    'Textarea',
    'Slide-toggle',
    'Meta',
    'Reference',
    'Select',
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
  ) {
    super();
  }

  get values(): FormGroup {
    return this.form.get('values') as FormGroup;
  }


  moduleFields: any[];
  form: FormGroup;
  choosedField: any = null;
  parentField: any = null;
  choosedModule: any = null;


  chooseField(field: any): void {
    this.form.get('parent').markAsTouched();
    this.form.get('parent').setValue(field._id);
    this.parentField = field;
  }

  removeParentField(): void {
    this.parentField = null;
    this.form.get('parent').setValue('');
  }

  ngOnInit(): void {
    this.loadForm();    
  }

  loadForm(): void {
    this.formData.values = this.formData.values || [];

    this.form = this.fb.group({
      parent: [this.formData.parent || ''],
      name: [this.formData.name || '', Validators.required],
      module: [this.formData.module || '', Validators.required],
      fieldType: [this.formData.fieldType || '', Validators.required],
      displayToList: [this.formData.displayToList],
      values: this.fb.array(this.formData.values || []),
      selectType: [this.formData.selectType || ''],
      reference: [this.formData.reference || ''],
      referenceType: [this.formData.referenceType || ''],
      value: [this.formData.value || ''],
      displayFieldName: [this.formData.displayFieldName || ''],
    });

    this.form.get('module').valueChanges.subscribe(module => {
      this.moduleFields = this.fields.filter((field: any) => field.module === module);
    });

    this.form.get('fieldType').valueChanges.subscribe(fieldType => {
        this.fieldType = fieldType;
    });

    this.setCurrentModule();
  }

  setCurrentModule(): void {
    if (this.route.snapshot.params.id && this.route.snapshot.params.id !== 'new') {
      const fieldId = this.route.snapshot.params.id; 
      const currentField = this.fields.filter((field: any) => field._id === fieldId)[0];
      const currentModuleId = currentField.module;
      this.moduleFields = this.fields.filter((field: any) => field.module === currentModuleId);
      this.form.get('module').setValue(currentModuleId);
    } else {
      // this.editMode = false;
      // this.mainData = {};
    }
   
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      const keywords = this.form.get('values') as FormArray;
      keywords.push(this.fb.control(value.trim()));
    }
    if (input) {
      input.value = '';
    }
  }

  remove(index: number): void {
    const keywords = this.form.get('values') as FormArray;
    if (index >= 0) {
      keywords.removeAt(index);
    }
  }
  
  // image methods
  // onUploadComplete(data: any, fieldName: string): void {
  //   this.form.get(fieldName).get('url').markAsTouched();
  //   this.form.get(fieldName).get('url').setValue(data.url);
  // }
 
  submit(): void {
    if (this.form.valid) {
      this.submitForm.emit(this.form.value);
    }
  }
}
