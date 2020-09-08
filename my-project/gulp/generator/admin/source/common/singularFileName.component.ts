import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { FormComponent } from 'app/shared/components/form.component';
import { MetaApiService } from 'app/shared/http/meta-api.service';
import { FileApiService } from '../../../../shared/http/files-api.service';
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

  update(data: any, pageTitle: any): void {
    this.api.update({ [pageTitle]: data.formData }).subscribe(
      () => this.snackBarService.open('Updated Successfully'),
      () => this.snackBarService.open('Update Failed'),
    );
  }

}
