import { Component, OnInit } from '@angular/core';
import { CommonApiService } from '../../../../shared/http/common-api.service';
import { SnackBarService } from 'app/shared/services/snack-bar.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  data: any;

  constructor(
    private api: CommonApiService,
    private snackBarService: SnackBarService,
  ) { }

  ngOnInit() {
    this.loadData();
  }


  loadData() {
    this.api.getOne().subscribe((data) => { this.data = data; });
  }

  update(data: any) {
    this.api.update(data).subscribe(
      () => this.snackBarService.open('Updated Successfully'),
      () => this.snackBarService.open('Update Failed'),
    );
  }
}
