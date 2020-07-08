import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { CommonApiService } from 'app/shared/http/common-api.service';
import { SnackBarService } from 'app/shared/services/snack-bar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  data: any;
  form: FormGroup;

  constructor(
    private commonsApiService: CommonApiService,
    private fb: FormBuilder,
    private snackBarService: SnackBarService,
  ) { }

  ngOnInit() {
    this.commonsApiService.getOne().subscribe((data: any) => {
      this.data = data.articles;
      this.initForm(data.articles);
    })
  }

  initForm(data) {
    this.form = this.fb.group({
      title: this.fb.group({
        en: [data.title.en || '', [Validators.required]],
        ge: [data.title.ge || '', [Validators.required]],
        ru: [data.title.ru || '', [Validators.required]],
      }),
      subtitle: this.fb.group({
        en: [data.subtitle.en || '', [Validators.required]],
        ge: [data.subtitle.ge || '', [Validators.required]],
        ru: [data.subtitle.ru || '', [Validators.required]],
      }),
    })
  }

  submit() {
    if (this.form.valid) {
      var formValue = { articles: this.form.value };
      this.commonsApiService.update(formValue).subscribe(
        () => this.snackBarService.open('Updated Successfully'),
        () => this.snackBarService.open('Update Failed'),
        () => this.commonsApiService.getOne()
      );
    }
  }

}
