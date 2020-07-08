import { Component, OnInit, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { <%=nameSingularFUC%> } from 'app/shared/models/<%=nameSingularLC%>';
import { FormComponent } from 'app/shared/components/form.component';
import { FormComponent as _FormComponent } from '../../form/form.component';
import * as _ from 'lodash';
import { MetaFormComponent } from '../../../../../../../shared/components/meta-form/meta-form.component';

@Component({
  selector: 'app-<%=nameSingularLC%>-modal',
  templateUrl: './<%=nameSingularLC%>-modal.component.html',
  styleUrls: ['./<%=nameSingularLC%>-modal.component.scss']
})
export class <%=nameSingularFUC%>ModalComponent implements OnInit, AfterViewInit {

  metas: any; // metas -> meta
  filesToCreate: any[] = []; // remove
  filesToDestroy: any[] = []; // remove 
  showFormWarning: boolean = false;
  submitted: boolean = false;

  showSubmit = false;

  @ViewChild('<%=nameSingularLC%>Form', { static: false }) <%=nameSingularLC%>FormComponent: _FormComponent;
  @ViewChild('<%=nameSingularLC%>MetaForm', { static: false }) <%=nameSingularLC%>MetaComponent: MetaFormComponent;

  <%=nameSingularLC%>Type: <%=nameSingularFUC%>;

  constructor(private dialogRef: MatDialogRef<<%=nameSingularFUC%>ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: <%=nameSingularFUC%>) { }

  formComponents: FormComponent[];

  ngOnInit() {
    // empty meta data object for making new meta object
    this.metas = {};
  }

  ngAfterViewInit() {
    this.formComponents = [
      this.<%=nameSingularLC%>FormComponent,
      this.<%=nameSingularLC%>MetaComponent,
    ];
  }

  formsAreValid() {
    return this.formComponents.filter(component => component).every((formComponent: FormComponent) => formComponent.formIsValid());
  }

  onFinish() {
    this.showFormWarning = false;
    this.submitted = true;
    if (this.formsAreValid()) {
      this.dialogRef.close(this.get<%=nameSingularFUC%>Data());
    } else {
      this.showFormWarning = true;
    }
  }

  get<%=nameSingularFUC%>Data(): any {
    let data = _.cloneDeep(_.merge(
      this.<%=nameSingularLC%>Type,
      this.<%=nameSingularLC%>MetaComponent.getFormValue(),
      this.<%=nameSingularLC%>FormComponent.getFormValue(),
    ));
    return data;
  }

} 
