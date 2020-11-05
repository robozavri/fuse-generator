import { Component, OnInit, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Category } from 'app/shared/models/category';
import { FormComponent } from 'app/shared/components/form.component';
import { FormComponent as _FormComponent } from '../../form/form.component';
import * as _ from 'lodash';
import { MetaFormComponent } from '../../../../../../../shared/components/meta-form/meta-form.component';

@Component({
  selector: 'app-category-modal',
  templateUrl: './category-modal.component.html',
  styleUrls: ['./category-modal.component.scss']
})
export class CategoryModalComponent implements OnInit, AfterViewInit {

  metas: any; // metas -> meta
  filesToCreate: any[] = []; // remove
  filesToDestroy: any[] = []; // remove 
  showFormWarning = false;
  submitted = false;

  showSubmit = false;

  @ViewChild('categoryForm', { static: false }) categoryFormComponent: _FormComponent;
  @ViewChild('categoryMetaForm', { static: false }) categoryMetaComponent: MetaFormComponent;

  categoryType: Category;

  constructor(
    private dialogRef: MatDialogRef<CategoryModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Category
  ) { }

  formComponents: FormComponent[];

  ngOnInit(): void {
    // empty meta data object for making new meta object
    this.metas = {};
  }

  ngAfterViewInit(): void {
    this.formComponents = [
      this.categoryFormComponent,
      this.categoryMetaComponent,
    ];
  }

  formsAreValid(): any {
    return this.formComponents.filter(component => component).every((formComponent: FormComponent) => formComponent.formIsValid());
  }

  onFinish(): void {
    this.showFormWarning = false;
    this.submitted = true;
    if (this.formsAreValid()) {
      this.dialogRef.close(this.getCategoryData());
    } else {
      this.showFormWarning = true;
    }
  }

  getCategoryData(): any {
    const data = _.cloneDeep(_.merge(
      this.categoryType,
      this.categoryMetaComponent.getFormValue(),
      this.categoryFormComponent.getFormValue(),
    ));
    return data;
  }

} 
