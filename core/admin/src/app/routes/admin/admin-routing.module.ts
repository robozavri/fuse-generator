import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminGuardService } from './admin-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'info',
    pathMatch: 'full',
    canActivate: [AdminGuardService],
  },
  {
    path: '',
    component: AdminComponent,
    canActivate: [AdminGuardService],
    children: [
      {
        path: 'info',
        loadChildren: './routes/info/info.module#InfoModule'
      },
      {
        path: 'meta',
        loadChildren: './routes/meta/meta.module#MetaModule'
      },
      {
        path: 'articles',
        loadChildren: './routes/articles/articles.module#ArticlesModule'
      },
      {
        path: 'products',
        loadChildren: './routes/products/products.module#ProductsModule'
      },
      {
        path: 'product/:id',
        loadChildren: './routes/product/product.module#ProductModule'
      },
      {
        path: 'product/new',
        loadChildren: './routes/product/product.module#ProductModule'
      },
      {
        path: 'calendar',
        loadChildren: './routes/calendar/calendar.module#CalendarModule'
      },
      {
        path: 'news',
        loadChildren: './routes/news/news.module#NewsModule'
      },
      {
        path: 'books',
        loadChildren: './routes/books/books.module#BooksModule'
      },
      {
        path: 'authors',
        loadChildren: './routes/authors/authors.module#AuthorsModule'
      },
      {
        path: 'author/:id',
        loadChildren: './routes/author/author.module#AuthorModule'
      },
      {
        path: 'video/new',
        loadChildren: './routes/video/video.module#VideoModule'
      },
      {
        path: 'videos',
        loadChildren: './routes/videos/videos.module#VideosModule'
      },
      {
        path: 'video/:id',
        loadChildren: './routes/video/video.module#VideoModule'
      },
      {
        path: 'author/new',
        loadChildren: './routes/videos/videos.module#VideosModule'
      },
      {
        path: 'car/new',
        loadChildren: './routes/car/car.module#CarModule'
      },
      {
        path: 'cars',
        loadChildren: './routes/cars/cars.module#CarsModule'
      },
      {
        path: 'car/:id',
        loadChildren: './routes/car/car.module#CarModule'
      },
      {
        path: 'compiuter/new',
        loadChildren: './routes/compiuter/compiuter.module#CompiuterModule'
      },
      {
        path: 'compiuters',
        loadChildren: './routes/compiuters/compiuters.module#CompiutersModule'
      },
      {
        path: 'compiuter/:id',
        loadChildren: './routes/compiuter/compiuter.module#CompiuterModule'
      },
      {
        path: 'blogs',
        loadChildren: './routes/blogs/blogs.module#BlogsModule'
      },
      {
        path: 'blog/:id',
        loadChildren: './routes/blog/blog.module#BlogModule'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
