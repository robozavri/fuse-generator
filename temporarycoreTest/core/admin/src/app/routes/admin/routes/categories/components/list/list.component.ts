import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { PageEvent, MatTable } from '@angular/material';
import { Category } from 'app/shared/models/category';
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
  @Output() updateForm = new EventEmitter<any>();
  @Output() deleteForm = new EventEmitter<Category>();
  @Output() updateMeta = new EventEmitter<any>();
  @Output() updatePositions = new EventEmitter<any>();

  @ViewChild('table', { static: false }) table: MatTable<ListComponent>;
  @ViewChild('nameLabel', { static: false }) nameLabel: ElementRef;

  dataSource: Category[];
  pageLength: number;
  pageEvent: PageEvent;
  expandedElement: any;

  displayedColumns = ['title',  'active'];

  constructor() { }

  ngOnInit(): void {
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

  submitMeta(data: any, id: any): void { // metaData -> data
    this.updateMeta.emit({ _id: id, ...data });
  }

  submitFormData(data: any, id: any): void {
    this.updateForm.emit({ _id: id, ...data });
  }

  confirmDelete(event, element): void {
    event.stopPropagation();
    this.deleteForm.emit(element);
  }
}

