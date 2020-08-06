import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { PageEvent, MatTable } from '@angular/material';
import { Article } from 'app/shared/models/article';
import { Query } from 'app/shared/models/query';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class ListComponent implements OnInit {
  @Input() items: any;
  @Input() numTotal: any;
  @Input() query: Query;

  @Output() queryChange = new EventEmitter<Query>();
  @Output() updateForm = new EventEmitter<Object>();
  @Output() deleteForm = new EventEmitter<Article>();
  @Output() updateMeta = new EventEmitter<Object>();
  @Output() updatePositions = new EventEmitter<any>();

  @ViewChild('table', { static: false }) table: MatTable<ListComponent>;
  @ViewChild('nameLabel', { static: false }) nameLabel: ElementRef;

  dataSource: Article[];
  pageLength: Number
  pageEvent: PageEvent;
  expandedElement: any;

  displayedColumns = ['id', 'image', 'name', 'category', 'price', 'quantity', 'active'];

  constructor() { }

  ngOnInit() {
    this.items.subscribe((data) => {
      this.dataSource = data;
    });
    this.numTotal.subscribe((data) => this.pageLength = data);
  }

  pagenatorEvent(pageData: any): any {
    this.queryChange.emit({
      page: pageData.pageIndex + 1,
      limit: pageData.pageSize,
    });
  }

  submitMeta(data: any, id: any) { // metaData -> data
    this.updateMeta.emit({ _id: id, ...data });
  }

  submitFormData(data: any, id: any) {
    this.updateForm.emit({ _id: id, ...data });
  }

  confirmDelete(event, element) {
    event.stopPropagation();
    this.deleteForm.emit(element);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.dataSource, event.previousIndex, event.currentIndex);
    this.table.renderRows();
    let page = this.query.page - 1;
    let limit = this.query.limit;
    const data = this.dataSource.map((item, index) => {
      return {
        position: index + (page * limit),
        _id: item._id,
      };
    });
    this.updatePositions.emit({ items: data });
    setTimeout(() => {
      this.nameLabel.nativeElement.click();
    }, 250);
  }
}

