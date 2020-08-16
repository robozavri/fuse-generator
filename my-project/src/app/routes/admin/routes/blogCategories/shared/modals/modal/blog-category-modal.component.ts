import { Component, OnInit, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BlogCategory } from 'app/shared/models/blogCategory';
import { FormComponent } from 'app/shared/components/form.component';
import { FormComponent as _FormComponent } from '../../form/form.component';
import * as _ from 'lodash';
import { MetaFormComponent } from '../../../../../../../shared/components/meta-form/meta-form.component';

@Component({
  selector: 'app-blogCategory-modal',
  templateUrl: './blogCategory-modal.component.html',
  styleUrls: ['./blogCategory-modal.component.scss']
})
export class BlogCategoryModalComponent implements OnInit, AfterViewInit {

  metas: any; // metas -> meta
  filesToCreate: any[] = []; // remove
  filesToDestroy: any[] = []; // remove 
  showFormWarning = false;
  submitted = false;

  showSubmit = false;

  @ViewChild('blogCategoryForm', { static: false }) blogCategoryFormComponent: _FormComponent;
  @ViewChild('blogCategoryMetaForm', { static: false }) blogCategoryMetaComponent: MetaFormComponent;

  blogCategoryType: BlogCategory;

  constructor(
    private dialogRef: MatDialogRef<BlogCategoryModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BlogCategory
  ) { }

  formComponents: FormComponent[];

  ngOnInit(): void {
    // empty meta data object for making new meta object
    this.metas = {};
  }

  ngAfterViewInit(): void {
    this.formComponents = [
      this.blogCategoryFormComponent,
      this.blogCategoryMetaComponent,
    ];
  }

  formsAreValid(): any {
    return this.formComponents.filter(component => component).every((formComponent: FormComponent) => formComponent.formIsValid());
  }

  onFinish(): void {
    this.showFormWarning = false;
    this.submitted = true;
    if (this.formsAreValid()) {
      this.dialogRef.close(this.getBlogCategoryData());
    } else {
      this.showFormWarning = true;
    }
  }

  getBlogCategoryData(): any {
    const data = _.cloneDeep(_.merge(
      this.blogCategoryType,
      this.blogCategoryMetaComponent.getFormValue(),
      this.blogCategoryFormComponent.getFormValue(),
    ));
    return data;
  }

} 
