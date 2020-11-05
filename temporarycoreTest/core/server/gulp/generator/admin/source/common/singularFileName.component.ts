import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { <%=nameSingularFUC%>ApiService } from '../../../../shared/http/<%=singularFileName%>-api.service';
import { SnackBarService } from 'app/shared/services/snack-bar.service';

<%=formComponentImporArea%>

@Component({
  selector: 'app-<%=singularFileName%>',
  templateUrl: './<%=singularFileName%>.component.html',
  styleUrls: ['./<%=singularFileName%>.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class <%=nameSingularFUC%>Component implements OnInit {

  form: FormGroup;
  formData: any = {};
  <%=formComponentClassPropertiesArea%>

  <%=formComponentClassInputArea%>
  constructor(
    <%=formComponentClassConstructorArgumentsArea%>
    private snackBarService: SnackBarService,
    private fb: FormBuilder,
    public api: <%=nameSingularFUC%>ApiService,
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.api.getOne().subscribe((data: any) => {
      this.formData = data;
      this.loadData();
    });
  }

  <%=formComponentClassBodyArea%>
  
  loadData(): any {

    <%=formComponentClassOnInitBodyArea%>

    this.form = this.fb.group({<%=formComponentFormGroupArea%>
    });
  
  }

  submit(): void {
    this.api.update({ ...this.form.value }).subscribe(
      () => this.snackBarService.open('Updated Successfully'),
      () => this.snackBarService.open('Update Failed'),
    );
  }

}
