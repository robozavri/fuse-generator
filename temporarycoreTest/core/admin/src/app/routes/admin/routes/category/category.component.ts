import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FormComponent } from 'app/shared/components/form.component';
import { BasicInfoComponent } from './shared/form/basic-info/basic-info.component';
import * as _ from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryApiService } from 'app/shared/http/category-api.service';
import { SnackBarService } from 'app/shared/services/snack-bar.service';
import { ModuleApiService } from 'app/shared/http/module-api.service';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  animations: fuseAnimations
})
export class CategoryComponent implements OnInit, AfterViewInit {
  
  formComponents: FormComponent[] = [];
  loadpage: boolean;
  mainData: any;
  fields: any;
  modules: any;
  editMode: boolean;
  metas: any;

  @ViewChild('basicInfoForm', { static: false }) basicInfoForm: BasicInfoComponent;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: CategoryApiService,
    private moduleApiService: ModuleApiService,
    private snackBarService: SnackBarService,
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.loadpage = true;
    });
    this.metas = {};
    this.loadData();
  }

  loadData(): void  {
 
    this.api.getByQuery({ all: true }).subscribe((data) => {
      this.fields = data.items;
    });

    this.moduleApiService.getByQuery({ all: true }).subscribe((data) => {
      this.modules = data.items;
    });

    if (this.route.snapshot.params.id && this.route.snapshot.params.id !== 'new') {
      this.editMode = true;
      this.api.getByQuery({ _id: this.route.snapshot.params.id }).subscribe((data) => {
        this.mainData = data.items[0];
        this.metas = _.has( this.mainData, 'meta') ? this.mainData.meta : {};
      });

    } else {
      this.editMode = false;
      this.mainData = {};
    }
  }

  ngAfterViewInit(): void  {
    this.formComponents = [
      this.basicInfoForm,
    ];
  }

  formsAreValid(): any  {
    return this.formComponents.filter(component => component).every((formComponent: FormComponent) => formComponent.formIsValid());
  }

  saveProduct(): void  { 
    console.log('this.getFormData()', this.getFormData());
    if (this.formsAreValid()) {
      if (this.editMode) {
        this.api.update({ _id: this.route.snapshot.params.id, ...this.getFormData() })
          .subscribe(() => {
            this.snackBarService.open('Updated Successfully');
          }, () => {
            this.snackBarService.open('Update Failed');
          }, () => {
          //  this.router.navigate(['/admin/categories']);
          });
      } else {
        this.api.create(this.getFormData())
          .subscribe(() => {
            this.snackBarService.open('Created Successfully');
          }, () => {
            this.snackBarService.open('Creation Failed');
          }, () => {
            // this.router.navigate(['/admin/categories']);
          });
      }
    } else {
      this.snackBarService.open('Failed validation error');
      console.log('create error');
    }
  }

  getFormData(): any {
    const data = _.cloneDeep(_.merge(
      this.basicInfoForm.getFormValue(),
    ));
    return data;
  }
}
