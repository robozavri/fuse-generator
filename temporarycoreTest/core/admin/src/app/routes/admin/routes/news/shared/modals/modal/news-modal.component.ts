import { Component, OnInit, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { News } from 'app/shared/models/news';
import { FormComponent } from 'app/shared/components/form.component';
import { FormComponent as _FormComponent } from '../../form/form.component';
import * as _ from 'lodash';
import { MetaFormComponent } from '../../../../../../../shared/components/meta-form/meta-form.component';

@Component({
  selector: 'app-news-modal',
  templateUrl: './news-modal.component.html',
  styleUrls: ['./news-modal.component.scss']
})
export class NewsModalComponent implements OnInit, AfterViewInit {

  metas: any; // metas -> meta
  filesToCreate: any[] = []; // remove
  filesToDestroy: any[] = []; // remove 
  showFormWarning: boolean = false;
  submitted: boolean = false;

  showSubmit = false;

  @ViewChild('newsForm', { static: false }) newsFormComponent: _FormComponent;
  @ViewChild('newsMetaForm', { static: false }) newsMetaComponent: MetaFormComponent;

  newsType: News;

  constructor(private dialogRef: MatDialogRef<NewsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: News) { }

  formComponents: FormComponent[];

  ngOnInit() {
    // empty meta data object for making new meta object
    this.metas = {};
  }

  ngAfterViewInit() {
    this.formComponents = [
      this.newsFormComponent,
      this.newsMetaComponent,
    ];
  }

  formsAreValid() {
    return this.formComponents.filter(component => component).every((formComponent: FormComponent) => formComponent.formIsValid());
  }

  onFinish() {
    this.showFormWarning = false;
    this.submitted = true;
    if (this.formsAreValid()) {
      this.dialogRef.close(this.getNewsData());
    } else {
      this.showFormWarning = true;
    }
  }

  getNewsData(): any {
    let data = _.cloneDeep(_.merge(
      this.newsType,
      this.newsMetaComponent.getFormValue(),
      this.newsFormComponent.getFormValue(),
    ));
    return data;
  }

} 
