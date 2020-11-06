import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { ConfigApiService } from '../../../../shared/http/config-api.service';
import { SnackBarService } from 'app/shared/services/snack-bar.service';



@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ConfigComponent implements OnInit {

  form: FormGroup;
  formData: any = {};
  
    
  langs = ['en', 'ge', 'ru', ];

  
  constructor(
    
    private snackBarService: SnackBarService,
    private fb: FormBuilder,
    public api: ConfigApiService,
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.api.getOne().subscribe((data: any) => {
      this.formData = data;
      this.loadData();
    });
  }

  
  
  loadData(): any {

    
    this.formData.langs = this.formData.langs || [];

    this.form = this.fb.group({
        langs: [this.formData.langs || []],
    });
  
  }

  submit(): void {
    this.api.update({ ...this.form.value }).subscribe(
      () => this.snackBarService.open('Updated Successfully'),
      () => this.snackBarService.open('Update Failed'),
    );
  }

}
