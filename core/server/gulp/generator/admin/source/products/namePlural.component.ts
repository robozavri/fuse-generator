import { Component, OnInit } from '@angular/core';
import { Query } from 'app/shared/models/query';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { <%=nameSingularFUC%> } from 'app/shared/models/<%=nameSingularLC%>';
import { Router, ActivatedRoute } from '@angular/router';
import { <%=nameSingularFUC%>ApiService } from 'app/shared/http/<%=nameSingularLC%>-api.service';
import { MatDialog } from '@angular/material';
import { switchMap, share, map, filter } from 'rxjs/operators';
import { ConfirmDeleteModalComponent } from '../../../../shared/modals/confirm-delete/confirm-delete-modal.component';
import { SnackBarService } from 'app/shared/services/snack-bar.service';

@Component({
  selector: 'app-<%=namePluralLC%>',
  templateUrl: './<%=namePluralLC%>.component.html',
  styleUrls: ['./<%=namePluralLC%>.component.scss']
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
    private api: <%=nameSingularFUC%>ApiService,
    private dialog: MatDialog,
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
};