import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { <%=nameSingularFUC%> } from 'app/shared/models/<%=singularFileName%>';
import { FormComponent as _FormComponent } from '../../../../../../shared/components/form.component';
<%=imports%>
<%=socialsImport%>

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss']
})
export class BasicInfoComponent extends _FormComponent implements OnInit {

  @Input() formData: <%=nameSingularFUC%>;
  @Input() showSubmit = true;
  @Output() submitForm = new EventEmitter<<%=nameSingularFUC%>>();


  form: FormGroup;
  <%=selectProperty%>
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
