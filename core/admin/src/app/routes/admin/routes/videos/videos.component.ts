import { Component, OnInit } from '@angular/core';
import { Query } from 'app/shared/models/query';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Video } from 'app/shared/models/video';
import { Router, ActivatedRoute } from '@angular/router';
import { VideoApiService } from 'app/shared/http/video-api.service';
import { MatDialog } from '@angular/material';
import { switchMap, share, map, filter } from 'rxjs/operators';
import { ConfirmDeleteModalComponent } from '../../../../shared/modals/confirm-delete/confirm-delete-modal.component';
import { SnackBarService } from 'app/shared/services/snack-bar.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent {
  query: Query;
  items$: Observable<Video[]>;
  numTotal$: Observable<number>;
  loadData$: Subject<Query>;

  dataSource: Video[];
  numTotal: Number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: VideoApiService,
    private dialog: MatDialog,
    private snackBarService: SnackBarService,
  ) {
    this.query = parseQueryParams(this.route.snapshot.queryParams);
    this.loadData$ = new BehaviorSubject(this.query);

    this.loadData$.subscribe((query: Query) => {
      this.router.navigate(['/admin/videos'], {
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

  delete(data: Video) {
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