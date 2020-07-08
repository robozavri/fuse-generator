import { Component, OnInit, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Book } from 'app/shared/models/book';
import { FormComponent } from 'app/shared/components/form.component';
import { FormComponent as _FormComponent } from '../../form/form.component';
import * as _ from 'lodash';
import { MetaFormComponent } from '../../../../../../../shared/components/meta-form/meta-form.component';

@Component({
  selector: 'app-book-modal',
  templateUrl: './book-modal.component.html',
  styleUrls: ['./book-modal.component.scss']
})
export class BookModalComponent implements OnInit, AfterViewInit {

  metas: any; // metas -> meta
  filesToCreate: any[] = []; // remove
  filesToDestroy: any[] = []; // remove 
  showFormWarning: boolean = false;
  submitted: boolean = false;

  showSubmit = false;

  @ViewChild('bookForm', { static: false }) bookFormComponent: _FormComponent;
  @ViewChild('bookMetaForm', { static: false }) bookMetaComponent: MetaFormComponent;

  bookType: Book;

  constructor(private dialogRef: MatDialogRef<BookModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Book) { }

  formComponents: FormComponent[];

  ngOnInit() {
    // empty meta data object for making new meta object
    this.metas = {};
  }

  ngAfterViewInit() {
    this.formComponents = [
      this.bookFormComponent,
      this.bookMetaComponent,
    ];
  }

  formsAreValid() {
    return this.formComponents.filter(component => component).every((formComponent: FormComponent) => formComponent.formIsValid());
  }

  onFinish() {
    this.showFormWarning = false;
    this.submitted = true;
    if (this.formsAreValid()) {
      this.dialogRef.close(this.getBookData());
    } else {
      this.showFormWarning = true;
    }
  }

  getBookData(): any {
    let data = _.cloneDeep(_.merge(
      this.bookType,
      this.bookMetaComponent.getFormValue(),
      this.bookFormComponent.getFormValue(),
    ));
    return data;
  }

} 
