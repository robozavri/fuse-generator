import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Meta } from 'app/shared/models/meta';
import { MatChipInputEvent, MatSnackBar } from '@angular/material';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { FormComponent } from 'app/shared/components/form.component';

@Component({
  selector: 'app-meta-form',
  templateUrl: './meta-form.component.html',
  styleUrls: ['./meta-form.component.scss']
})
export class MetaFormComponent extends FormComponent implements OnInit {
  @Input() meta: Meta;
  // tslint:disable-next-line: ban-types
  @Output() submitMeta = new EventEmitter<Object>();
  @Input() showSubmit = true;

  accept: string;
  base64 = false;

  form: FormGroup;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes = [ENTER, COMMA];

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
  ) {
    super();
  }

  ngOnInit(): any {
    this.meta.image = this.meta.image || {};
    this.meta.title = this.meta.title || {};
    this.meta.description = this.meta.description || {};
    this.meta.keywords = this.meta.keywords || [];

    this.form = this.fb.group({
      meta: this.fb.group({
        title: this.fb.group({
          ge: [this.meta.title.ge || ''],
          en: [this.meta.title.en || ''],
          ru: [this.meta.title.ru || ''],
        }),
        description: this.fb.group({
          ge: [this.meta.description.ge || ''],
          en: [this.meta.description.ge || ''],
          ru: [this.meta.description.ge || ''],
        }),
        keywords: this.fb.array(this.meta.keywords || []),
        image: this.fb.group({
          url: [this.meta.image.url || ''],
        })
      })
    });
  }

  getControls(frmGrp: any, key: string): any {
    return (<FormArray>frmGrp.controls[key]).controls;
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      const keywords = this.form.get('meta').get('keywords') as FormArray;
      keywords.push(this.fb.control(value.trim()));
    }
    if (input) {
      input.value = '';
    }
  }

  remove(index: number): void {
    const keywords = this.form.get('meta').get('keywords') as FormArray;
    if (index >= 0) {
      keywords.removeAt(index);
    }
  }

  onUploadComplete(data): any {
    this.form.get('meta').get('image').get('url').markAsTouched();
    this.form.get('meta').get('image').get('url').setValue(data.url);
  }

  submit(form): any {
    if (form.valid) {
      this.submitMeta.emit(form.value);
      this.snackBar.open(
        'Update Successfully',
        null,
        {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        }
      );
    } else {
      this.snackBar.open(
        'Update Problem',
        null,
        {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        }
      );
    }

  }

}
