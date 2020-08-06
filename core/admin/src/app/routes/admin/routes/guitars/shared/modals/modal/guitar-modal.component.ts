import { Component, OnInit, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Guitar } from 'app/shared/models/guitar';
import { FormComponent } from 'app/shared/components/form.component';
import { FormComponent as _FormComponent } from '../../form/form.component';
import * as _ from 'lodash';
import { MetaFormComponent } from '../../../../../../../shared/components/meta-form/meta-form.component';

@Component({
  selector: 'app-guitar-modal',
  templateUrl: './guitar-modal.component.html',
  styleUrls: ['./guitar-modal.component.scss']
})
export class GuitarModalComponent implements OnInit, AfterViewInit {

  metas: any; // metas -> meta
  filesToCreate: any[] = []; // remove
  filesToDestroy: any[] = []; // remove 
  showFormWarning: boolean = false;
  submitted: boolean = false;

  showSubmit = false;

  @ViewChild('guitarForm', { static: false }) guitarFormComponent: _FormComponent;
  @ViewChild('guitarMetaForm', { static: false }) guitarMetaComponent: MetaFormComponent;

  guitarType: Guitar;

  constructor(private dialogRef: MatDialogRef<GuitarModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Guitar) { }

  formComponents: FormComponent[];

  ngOnInit() {
    // empty meta data object for making new meta object
    this.metas = {};
  }

  ngAfterViewInit() {
    this.formComponents = [
      this.guitarFormComponent,
      this.guitarMetaComponent,
    ];
  }

  formsAreValid() {
    return this.formComponents.filter(component => component).every((formComponent: FormComponent) => formComponent.formIsValid());
  }

  onFinish() {
    this.showFormWarning = false;
    this.submitted = true;
    if (this.formsAreValid()) {
      this.dialogRef.close(this.getGuitarData());
    } else {
      this.showFormWarning = true;
    }
  }

  getGuitarData(): any {
    let data = _.cloneDeep(_.merge(
      this.guitarType,
      this.guitarMetaComponent.getFormValue(),
      this.guitarFormComponent.getFormValue(),
    ));
    return data;
  }

} 
