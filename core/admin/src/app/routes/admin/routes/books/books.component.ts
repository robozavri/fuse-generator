import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material';
import { BookModalComponent } from './shared/modals/modal/book-modal.component';
import { Query } from '../../../../shared/models/query';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { Book } from '../../../../shared/models/book';
import { Router, ActivatedRoute } from '@angular/router';
import { BookApiService } from '../../../../shared/http/book-api.service';
import { ConfirmDeleteModalComponent } from '../../../../shared/modals/confirm-delete/confirm-delete-modal.component';
import { filter, switchMap, share, map } from 'rxjs/operators';
import { fuseAnimations } from '../../../../../@fuse/animations';
import { FileApiService } from 'app/shared/http/files-api.service';
import { SnackBarService } from 'app/shared/services/snack-bar.service';


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class BooksComponent {

  query: Query;
  items$: Observable<Book[]>;
  numTotal$: Observable<number>;
  loadData$: Subject<Query>;

  dataSource: Book[];
  numTotal: Number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api:BookApiService,
    private dialog: MatDialog,
    public fileApiService: FileApiService,
    private snackBarService: SnackBarService,
  ) {

    this.query = parseQueryParams(this.route.snapshot.queryParams);
    this.loadData$ = new BehaviorSubject(this.query);

    this.loadData$.subscribe((query: Query) => {
      this.router.navigate(['/admin/books'], {
        queryParams: query,
        queryParamsHandling: 'merge',
      });
    });

    const data$ = this.loadData$.pipe(
      switchMap(q => this.api.getByQuery(q)),
      share(),
    );

    this.items$ = data$.pipe(map(d => d.items));
    this.numTotal$ = data$.pipe(map(d => d.numTotal));

  }

  add() {
    const data: Book = {
      title: {},
      description: {},
      thumbnail: {},
      content: {},
      isFeatured: true,
      meta: {},
    };
    this.dialog
      .open(BookModalComponent, { data })
      .afterClosed()
      .pipe(
        filter(r => r),
        switchMap(d => {
          return this.api.create(d);
        }),
      )
      .subscribe(
        () => this.snackBarService.open('Created Successfully'),
        () => this.snackBarService.open('Creation Failed'),
        () => this.loadData$.next(this.query)
      );
  }

  update(data: any) {
    this.api.update(data)
      .subscribe(
        () => this.snackBarService.open('Updated Successfully'),
        () => this.snackBarService.open('Update Failed'),
        () => this.loadData$.next(this.query)
      );
  }

  updatePositions(data: any) {
    this.api.updatePositions(data)
      .subscribe(() => {
        this.loadData$.next(this.query);
      }, () => {
        this.loadData$.next(this.query);
      });
  }


  delete(data: Book) {
    this.dialog
      .open(ConfirmDeleteModalComponent, { data })
      .afterClosed()
      .pipe(
        filter(r => r),
        switchMap(() => this.api.delete(data._id)),
      )
      .subscribe(
        () => this.snackBarService.open('Deleted Successfully'),
        () => this.snackBarService.open('Deletion Failed'),
        () => this.loadData$.next(this.query)
      );
  }

  reloadParams(query: Query) {
    this.query = { ...this.query, ...query };
    this.loadData$.next(this.query);
  }
}


function parseQueryParams(params): Query {
  return {
    ...params,
    page: params.page ? Number(params.page) : 1,
    limit: params.limit ? Number(params.limit) : 10,
  };
}
