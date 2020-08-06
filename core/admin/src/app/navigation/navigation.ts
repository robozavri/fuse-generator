import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
  {
    id: 'applications',
    title: 'Applications',
    translate: 'NAV.APPLICATIONS',
    type: 'group',
    children: [
      {
        id: 'info',
        title: 'Info',
        translate: 'NAV.INFO',
        type: 'item',
        icon: 'info',
        url: '/admin/info',
      },
      {
        id: 'meta',
        title: 'Meta',
        translate: 'NAV.META',
        type: 'item',
        icon: 'all_out',
        url: '/admin/meta',
      },
      {
        id: 'articles',
        title: 'Articles',
        translate: 'NAV.ARTICLES',
        type: 'item',
        icon: 'subtitles',
        url: '/admin/articles',
      },
      {
        id: 'products',
        title: 'Products',
        translate: 'NAV.PRODUCTS',
        type: 'item',
        icon: 'shopping_cart',
        url: '/admin/products',
      },
      {
        id: 'calendar',
        title: 'Calendar',
        translate: 'NAV.CALENDAR',
        type: 'item',
        icon: 'calendar_today',
        url: '/admin/calendar',
      },
        {
            id: 'news',
            title: 'news',
            translate: 'news',
            type: 'item',
            icon: 'info',
            url: '/admin/news',
        },
        {
            id: 'authors',
            title: 'authors',
            translate: 'authors',
            type: 'item',
            icon: 'info',
            url: '/admin/authors',
        },
        {
            id: 'books',
            title: 'books',
            translate: 'books',
            type: 'item',
            icon: 'info',
            url: '/admin/books',
        },
        {
          id: 'videos',
          title: 'videos',
          translate: 'videos',
          type: 'item',
          icon: 'info',
          url: '/admin/videos',
      },
      {
        id: 'compiuters',
        title: 'compiuters',
        translate: 'compiuters',
        type: 'item',
        icon: 'info',
        url: '/admin/compiuters',
    },
    {
      id: 'guitars',
      title: 'guitars',
      translate: 'guitars',
      type: 'item',
      icon: 'info',
      url: '/admin/guitars',
  },
  {
    id: 'cars',
    title: 'cars',
    translate: 'cars',
    type: 'item',
    icon: 'info',
    url: '/admin/cars',
},
  
    ]
  }

];
