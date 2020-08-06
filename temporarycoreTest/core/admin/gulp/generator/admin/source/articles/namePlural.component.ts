import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material';
import { <%=nameSingularFUC%>ModalComponent } from './shared/modals/modal/<%=nameSingularLC%>-modal.component';
import { Query } from '../../../../shared/models/query';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { <%=nameSingularFUC%> } from '../../../../shared/models/<%=nameSingularLC%>';
import { Router, ActivatedRoute } from '@angular/router';
import { <%=nameSingularFUC%>ApiService } from '../../../../shared/http/<%=nameSingularLC%>-api.service';
import { ConfirmDeleteModalComponent } from '../../../../shared/modals/confirm-delete/confirm-delete-modal.component';
import { filter, switchMap, share, map } from 'rxjs/operators';
import { fuseAnimations } from '../../../../../@fuse/animations';
import { FileApiService } from 'app/shared/http/files-api.service';
import { SnackBarService } from 'app/shared/services/snack-bar.service';


@Component({
  selector: 'app-<%=namePluralLC%>',
  templateUrl: './<%=namePluralLC%>.component.html',
  styleUrls: ['./<%=namePluralLC%>.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class <%=namePluralFUC%>Component {

  query: Query;
  items$: Observable<<%=nameSingularFUC%>[]>;
  numTotal$: Observable<number>;
  loadData$: Subject<Query>;

  dataSource: <%=nameSingularFUC%>[];
  numTotal: Number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api:<%=nameSingularFUC%>ApiService,
    private dialog: MatDialog,
    public fileApiService: FileApiService,
    private snackBarService: SnackBarService,
  ) {

    this.query = parseQueryParams(this.route.snapshot.queryParams);
    this.loadData$ = new BehaviorSubject(this.query);

    this.loadData$.subscribe((query: Query) => {
      this.router.navigate(['/admin/<%=namePluralLC%>'], {
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
    const data: <%=nameSingularFUC%> = {
      title: {},
      description: {},
      thumbnail: {},
      meta: {},
    };
    this.dialog
      .open(<%=nameSingularFUC%>ModalComponent, { data })
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


  delete(data: <%=nameSingularFUC%>) {
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
