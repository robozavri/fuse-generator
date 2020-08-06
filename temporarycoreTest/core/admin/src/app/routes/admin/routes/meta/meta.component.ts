import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormComponent } from 'app/shared/components/form.component';
import { MetaApiService } from 'app/shared/http/meta-api.service';
import { FileApiService } from '../../../../shared/http/files-api.service';
import { SnackBarService } from 'app/shared/services/snack-bar.service';

@Component({
  selector: 'app-meta',
  templateUrl: './meta.component.html',
  styleUrls: ['./meta.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MetaComponent implements OnInit {
  metas: any;

  constructor(
    private api: MetaApiService,
    public fileApiService: FileApiService,
    private snackBarService: SnackBarService,
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.api.getOne().subscribe((data) => {
      this.metas = data;
    });
  }

  update(data: any, pageTitle: any) {
    this.api.update({ [pageTitle]: data.meta }).subscribe(
      () => this.snackBarService.open('Updated Successfully'),
      () => this.snackBarService.open('Update Failed'),
    );
  }

}
