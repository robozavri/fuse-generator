import { Component, OnInit, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Article } from 'app/shared/models/article';
import { FormComponent } from 'app/shared/components/form.component';
import { FormComponent as _FormComponent } from '../../form/form.component';
import * as _ from 'lodash';
import { MetaFormComponent } from '../../../../../../../shared/components/meta-form/meta-form.component';

@Component({
  selector: 'app-article-modal',
  templateUrl: './article-modal.component.html',
  styleUrls: ['./article-modal.component.scss']
})
export class ArticleModalComponent implements OnInit, AfterViewInit {

  metas: any; // metas -> meta
  filesToCreate: any[] = []; // remove
  filesToDestroy: any[] = []; // remove 
  showFormWarning: boolean = false;
  submitted: boolean = false;

  showSubmit = false;

  @ViewChild('articleForm', { static: false }) articleFormComponent: _FormComponent;
  @ViewChild('articleMetaForm', { static: false }) articleMetaComponent: MetaFormComponent;

  articleType: Article;

  constructor(private dialogRef: MatDialogRef<ArticleModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Article) { }

  formComponents: FormComponent[];

  ngOnInit() {
    // empty meta data object for making new meta object
    this.metas = {};
  }

  ngAfterViewInit() {
    this.formComponents = [
      this.articleFormComponent,
      this.articleMetaComponent,
    ];
  }

  formsAreValid() {
    return this.formComponents.filter(component => component).every((formComponent: FormComponent) => formComponent.formIsValid());
  }

  onFinish() {
    this.showFormWarning = false;
    this.submitted = true;
    if (this.formsAreValid()) {
      this.dialogRef.close(this.getArticleData());
    } else {
      this.showFormWarning = true;
    }
  }

  getArticleData(): any {
    let data = _.cloneDeep(_.merge(
      this.articleType,
      this.articleMetaComponent.getFormValue(),
      this.articleFormComponent.getFormValue(),
    ));
    return data;
  }

} 
