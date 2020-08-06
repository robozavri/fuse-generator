import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FormComponent } from 'app/shared/components/form.component';
import { BasicInfoComponent } from './shared/form/basic-info/basic-info.component';
import * as _ from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';
import { <%=nameSingularFUC%>ApiService } from 'app/shared/http/<%=nameSingularLC%>-api.service';
import { SnackBarService } from 'app/shared/services/snack-bar.service';

@Component({
  selector: 'app-<%=nameSingularLC%>',
  templateUrl: './<%=nameSingularLC%>.component.html',
  styleUrls: ['./<%=nameSingularLC%>.component.scss'],
  animations: fuseAnimations
})
export class <%=nameSingularFUC%>Component implements OnInit, AfterViewInit {
  pageType: any;
  formComponents: FormComponent[] = [];
  loadpage: boolean;
  mainData: any;
  editMode: boolean;


  @ViewChild('basicInfoForm', { static: false }) basicInfoForm: BasicInfoComponent;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: <%=nameSingularFUC%>ApiService,
    private snackBarService: SnackBarService,
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.loadpage = true;
    });

    this.loadData();
  }

  loadData() {
    if (this.route.snapshot.params.id && this.route.snapshot.params.id !== 'new') {
      this.editMode = true;
      this.api.getByQuery({ _id: this.route.snapshot.params.id }).subscribe((data) => {
        this.mainData = data.items[0];
      });

    } else {
      this.editMode = false;
      this.mainData = {};
    }
  }

  ngAfterViewInit() {
    this.formComponents = [
      this.basicInfoForm
    ];
  }

  formsAreValid() {
    return this.formComponents.filter(component => component).every((formComponent: FormComponent) => formComponent.formIsValid());
  }

  saveProduct() {
    if (this.formsAreValid()) {
      if (this.editMode) {
        this.api.update({ _id: this.route.snapshot.params.id, ...this.getFormData() })
          .subscribe(() => {
            this.snackBarService.open('Updated Successfully');
          }, () => {
            this.snackBarService.open('Update Failed');
          }, () => {
           // this.router.navigate(['/admin/<%=namePluralLC%>']);
          });
      } else {
        this.api.create(this.getFormData())
          .subscribe(() => {
            this.snackBarService.open('Created Successfully');
          }, () => {
            this.snackBarService.open('Creation Failed');
          }, () => {
            this.router.navigate(['/admin/<%=namePluralLC%>']);
          });
      }
    } else {
      console.log('create error');
    }
  }

  getFormData(): any {
    let data = _.cloneDeep(_.merge(
      this.basicInfoForm.getFormValue(),
    ));
    return data;
  }
}
