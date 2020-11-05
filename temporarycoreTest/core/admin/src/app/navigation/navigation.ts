import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
  {
    id: 'applications',
    title: 'Applications',
    translate: 'NAV.APPLICATIONS',
    type: 'group',
    children: [
      {
        id: 'modules',
        title: 'modules',
        type: 'item',
        icon: 'info',
        url: '/admin/modules',
      },
      {
        id: 'categories',
        title: 'categories',
        type: 'item',
        icon: 'info',
        url: '/admin/categories',
      },
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
        icon: 'subtitles',
        url: '/admin/news',
      },
    ]
  }

];
