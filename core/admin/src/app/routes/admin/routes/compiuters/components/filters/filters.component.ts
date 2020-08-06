import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Query } from 'app/shared/models/query';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  animations: fuseAnimations
})
export class FiltersComponent implements OnInit {
  @Input() query: Query;
  @Output() queryChange = new EventEmitter<Query>();
  @Output() createNew = new EventEmitter<Query>();

  constructor() { }

  ngOnInit() {
  }

  applyFilter(filterValue: string) {
    this.query.keyword = filterValue.trim().toLowerCase();
    let val = this.query.keyword;
    this.queryChange.emit({ keyword: val });
  }

}
