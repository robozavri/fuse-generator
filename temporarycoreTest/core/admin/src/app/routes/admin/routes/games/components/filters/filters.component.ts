import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { fuseAnimations } from '../../../../../../../@fuse/animations';
import { Query } from 'app/shared/models/query';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  animations: fuseAnimations,
})
export class FiltersComponent implements OnInit {
  @Input() query: Query;
  @Output() queryChange = new EventEmitter<Query>();
  @Output() createNew = new EventEmitter<Query>();

  constructor() { }

  ngOnInit(): void {
  }

  applyFilter(filterValue: string): void {
    this.query.keyword = filterValue.trim().toLowerCase();
    const val = this.query.keyword;
    this.queryChange.emit({ keyword: val });
  }

  add(): void {
    this.createNew.emit();
  }

}
