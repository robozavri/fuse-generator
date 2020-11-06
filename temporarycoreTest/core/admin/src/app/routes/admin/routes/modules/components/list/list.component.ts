import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { PageEvent, MatTable } from '@angular/material';
import { Module } from 'app/shared/models/module';
import { Query } from 'app/shared/models/query';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ModuleApiService } from 'app/shared/http/module-api.service';
import { SnackBarService } from 'app/shared/services/snack-bar.service';


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
  @Output() deleteForm = new EventEmitter<Module>();
  @Output() generate = new EventEmitter<any>();
  @Output() updateMeta = new EventEmitter<any>();
  @Output() updatePositions = new EventEmitter<any>();

  @ViewChild('table', { static: false }) table: MatTable<ListComponent>;
  @ViewChild('nameLabel', { static: false }) nameLabel: ElementRef;

  dataSource: Module[];
  pageLength: number;
  pageEvent: PageEvent;
  expandedElement: any;
  displayedColumns = ['title', 'generate', 'active'];


  constructor(
    private moduleApiService: ModuleApiService,
    private snackBarService: SnackBarService,
  ) { }

  ngOnInit(): void {
    this.items.subscribe((data) => {
      this.dataSource = data;
    });
    this.numTotal.subscribe((data) => this.pageLength = data);
    
  }

  toggleCheckbox(event: any): void {
    event.stopPropagation();
  }

  generateModule(event: any, module: any): void {
     console.log('module', module);
     this.moduleApiService.generate({_id: module._id}).subscribe(
      () => this.snackBarService.open('Genereted Successfully'),
      () => this.snackBarService.open('Generate Failed'),
    );
    //  this.generate.emit({_id: module._id});
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

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.dataSource, event.previousIndex, event.currentIndex);
    this.table.renderRows();
    const page = this.query.page - 1;
    const limit = this.query.limit;
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

