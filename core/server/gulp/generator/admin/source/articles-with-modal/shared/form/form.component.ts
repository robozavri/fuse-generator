import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { <%=nameSingularFUC%> } from 'app/shared/models/<%=singularFileName%>';
import { FormComponent as _FormComponent } from '../../../../../../shared/components/form.component';
import { MatSnackBar } from '@angular/material';
<%=imports%>
<%=socialsImport%>

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
  <%=classProperties%>
  <%=imagesProperties%>

  constructor(
    private fb: FormBuilder,
    <%=constructorArtuments%>
  ) {
    super();
  }

  ngOnInit(): void {
    <%=onInitBody%>
    <%=formEmptyObjects%>

    this.form = <%=formGroup%>
  }

  <%=socialsGetter%>

  <%=socialsMethods%>

  <%=imageMethods%>

  <%=imagesMethods%>

  submit(): void {
    if (this.form.valid) {
      this.submitForm.emit(this.form.value);
    }
  }
}
