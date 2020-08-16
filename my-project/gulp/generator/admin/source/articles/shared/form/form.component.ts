import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { <%=nameSingularFUC%> } from 'app/shared/models/<%=singularFileName%>';
import { FormComponent as _FormComponent } from '../../../../../../shared/components/form.component';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent extends _FormComponent implements OnInit {

  @Input() formData: <%=nameSingularFUC%>;
  @Input() showSubmit = true;
  @Output() submitForm = new EventEmitter<<%=nameSingularFUC%>>();


  form: FormGroup;
  selectedImage: any;
  filesToCreate: any[] = [];
  filesToDestroy: any[] = [];

  constructor(
    private fb: FormBuilder,
  ) {
    super();
  }

  ngOnInit(): void {
    this.formData.title = this.formData.title || {};
    this.formData.description = this.formData.description || {};
    this.formData.thumbnail = this.formData.thumbnail || {};

    this.form = <%=formGroup%>
  }

  <%=imageMethods%>

  submit(): void {
    if (this.form.valid) {
      this.submitForm.emit(this.form.value);
    }
  }
}
