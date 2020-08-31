import { Component, OnInit, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Blog } from 'app/shared/models/blog';
import { FormComponent } from 'app/shared/components/form.component';
import { FormComponent as _FormComponent } from '../../form/form.component';
import * as _ from 'lodash';
import { BlogCategoryApiService } from 'app/shared/http/blog-category-api.service';

@Component({
  selector: 'app-blog-modal',
  templateUrl: './blog-modal.component.html',
  styleUrls: ['./blog-modal.component.scss']
})
export class BlogModalComponent implements OnInit, AfterViewInit {

  metas: any; // metas -> meta
  showFormWarning = false;
  submitted = false;
  showSubmit = false;
    
  categories: any;
   

  @ViewChild('blogForm', { static: false }) blogFormComponent: _FormComponent;
  // @ViewChild('blogMetaForm', { static: false }) blogMetaComponent: MetaFormComponent;

  
  blogType: Blog;

  constructor(
    
    private blogCategoryApiService: BlogCategoryApiService,
      
    private dialogRef: MatDialogRef<BlogModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Blog
  ) { }

  formComponents: FormComponent[];

  ngOnInit(): void {
    // empty meta data object for making new meta object
    //this.metas = {};
    
    this.blogCategoryApiService.getByQuery({all: true}).subscribe((data: any) => {
        this.categories = data.items;
    });
  
  }

  ngAfterViewInit(): void {
    this.formComponents = [
      this.blogFormComponent,
      
    ];
  }

  formsAreValid(): any {
    return this.formComponents.filter(component => component).every((formComponent: FormComponent) => formComponent.formIsValid());
  }

  onFinish(): void {
    this.showFormWarning = false;
    this.submitted = true;
    if (this.formsAreValid()) {
      this.dialogRef.close(this.getBlogData());
    } else {
      this.showFormWarning = true;
    }
  }

  getBlogData(): any {
    const data = _.cloneDeep(_.merge(
      this.blogType,
      this.blogFormComponent.getFormValue(),
      
    ));
    return data;
  }

} 
