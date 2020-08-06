import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Query } from 'app/shared/models/query';
import { Article } from 'app/shared/models/article';
import { PageEvent, MatSort } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: fuseAnimations,
})
export class ListComponent implements OnInit {
  @Input() items: any;
  @Input() numTotal: any;
  @Input() query: Query;

  @Output() deleteForm = new EventEmitter<Article>();
  @Output() queryChange = new EventEmitter<Query>();

  dataSource: Article[];
  pageLength: Number
  pageEvent: PageEvent;
  expandedElement: any;

  displayedColumns = ['name', 'category', 'price', 'quantity', 'active'];

  constructor() { }

  ngOnInit() {
    this.items.subscribe((data) => this.dataSource = data);
    this.numTotal.subscribe((data) => this.pageLength = data);
  }

  pagenatorEvent(pageData: any): any {
    this.queryChange.emit({
      page: pageData.pageIndex + 1,
      limit: pageData.pageSize,
    });
  }

  // sortData(data): any[] {
  //   if (!this._matSort.active || this._matSort.direction === '') {
  //     return data;
  //   }

  //   return data.sort((a, b) => {
  //     let propertyA: number | string = '';
  //     let propertyB: number | string = '';

  //     switch (this._matSort.active) {
  //       case 'id':
  //         [propertyA, propertyB] = [a.id, b.id];
  //         break;
  //       case 'name':
  //         [propertyA, propertyB] = [a.name, b.name];
  //         break;
  //       case 'categories':
  //         [propertyA, propertyB] = [a.categories[0], b.categories[0]];
  //         break;
  //       case 'price':
  //         [propertyA, propertyB] = [a.priceTaxIncl, b.priceTaxIncl];
  //         break;
  //       case 'quantity':
  //         [propertyA, propertyB] = [a.quantity, b.quantity];
  //         break;
  //       case 'active':
  //         [propertyA, propertyB] = [a.active, b.active];
  //         break;
  //     }

  //     const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
  //     const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

  //     return (valueA < valueB ? -1 : 1) * (this._matSort.direction === 'asc' ? 1 : -1);
  //   });
  // }


  confirmDelete(event, element) {
    event.stopPropagation();
    this.deleteForm.emit(element);
  }

}
