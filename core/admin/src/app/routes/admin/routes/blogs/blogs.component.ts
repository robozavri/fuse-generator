import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material';
import { BlogModalComponent } from './shared/modals/modal/blog-modal.component';
import { Query } from '../../../../shared/models/query';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { Blog } from '../../../../shared/models/blog';
import { Router, ActivatedRoute } from '@angular/router';
import { BlogApiService } from '../../../../shared/http/blog-api.service';
import { ConfirmDeleteModalComponent } from '../../../../shared/modals/confirm-delete/confirm-delete-modal.component';
import { filter, switchMap, share, map } from 'rxjs/operators';
import { fuseAnimations } from '../../../../../@fuse/animations';
import { FileApiService } from 'app/shared/http/files-api.service';
import { SnackBarService } from 'app/shared/services/snack-bar.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class BlogsComponent {

  query: Query;
  items$: Observable<Blog[]>;
  numTotal$: Observable<number>;
  loadData$: Subject<Query>;

  dataSource: Blog[];
  numTotal: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: BlogApiService,
    private dialog: MatDialog,
    public fileApiService: FileApiService,
    private snackBarService: SnackBarService,
  ) {

    this.query = this.parseQueryParams(this.route.snapshot.queryParams);
    this.loadData$ = new BehaviorSubject(this.query);

    this.loadData$.subscribe((query: Query) => {
      this.router.navigate(['/admin/blogs'], {
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

  add(): void {
    const data: Blog = { 
      
      name: '',
      title: {},
      description: {},
      smallDescription: {},
      content: {},
      aboutQuili: '',
      aboutPrimitive: '',
      count: '',
      thumbnail: {},
      images: [],
      createAt: new Date(),
      socialAccounts: [],
      category: [],
      blogType: '',
      isFeatured: false,
      meta: {}, 
    };
    this.dialog
      .open(BlogModalComponent, { data })
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

  update(data: any): void {
    this.api.update(data)
      .subscribe(
        () => this.snackBarService.open('Updated Successfully'),
        () => this.snackBarService.open('Update Failed'),
        () => this.loadData$.next(this.query)
      );
  }

  updatePositions(data: any): void {
    this.api.updatePositions(data)
      .subscribe(() => {
        this.loadData$.next(this.query);
      }, () => {
        this.loadData$.next(this.query);
      });
  }


  delete(data: Blog): void {
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

  reloadParams(query: Query): void {
    this.query = { ...this.query, ...query };
    this.loadData$.next(this.query);
  }

  parseQueryParams(params): Query {
    return {
      ...params,
      page: params.page ? Number(params.page) : 1,
      limit: params.limit ? Number(params.limit) : 10,
    };
  }
}



